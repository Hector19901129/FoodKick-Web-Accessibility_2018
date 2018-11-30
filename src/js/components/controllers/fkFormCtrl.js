class FkFormCtrl {
  constructor($scope, $compile, $element, $log, fkHttp, fkUtils) {
    this.$scope = $scope;
    this.$compile = $compile;
    this.$element = $element;
    this.$log = $log;
    this.fkHttp = fkHttp;
    this.fkUtils = fkUtils;

    this.formDescriptor = this.formDescriptor || {};
    this.formDescriptor.fields = this.formDescriptor.fields || [];
    this.formDescriptor.actions = this.formDescriptor.actions || [];

    this.ismobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());

    $scope.$on('breakpoint-change', (ev, data) => {
      this.ismobile = this.decideIsMobile(data.breakpoint);
    });

    $scope.actions = {};

    this.ERRORMESSAGES = {
      required: 'Required Field',
      pattern: 'This field is not properly formatted.',
      email: 'Valid email address required.'
    };

    let formCtrl,
        formHelpers,
        clearErrors = config => {
          config = config || {};
          let errors = $element[0].querySelectorAll('[fk-error]'),
              invalid = $element[0].querySelectorAll('[aria-invalid]');

          Array.from(errors).forEach((error) => {
            error.remove();
          });

          Array.from(invalid).forEach((field) => {
            field.removeAttribute('aria-invalid');
          });

          if (config.clearTouch) {
            this.formDescriptor.fields.forEach((field) => {
              let formFieldEl = angular.element($element[0].querySelector('[name="'+field.name+'"]')),
                  mCtrl = formFieldEl.controller('ngModel');
              if (mCtrl) {
                mCtrl.$setUntouched();
                mCtrl.$setPristine();
              }
            });
          }
        },
        resetField = field => {
          if (field) {
            if ($scope.originalData[field]) {
              this.formData[field] = $scope.originalData[field];
            } else if (this.formData[field]) {
              this.formData[field] = '';
            }
          }
        },
        reset = () => {
          // reset fields via descriptor
          this.formDescriptor.fields.forEach((desc) => {
            resetField(desc.name);
          });
          clearErrors({clearTouch: true});
        },
        selectOption = (name, value) => {
          let field = this.formDescriptor && this.formDescriptor.fields.filter(f => f.name === name).shift(),
              option;

          if (field) {
            option = field.options && field.options.filter(o => o.value === value).shift();

            if (option) {
              this.formData[name] = option;
            }
          }
        },
        serialize = data => {
          let sData = {};

          Object.keys(data).forEach(k => {
            let d = data[k];

            sData[k] = d && d.value ? d.value : d;
          });

          return sData;
        },
        filterFields = (data, fields) => {
          let filteredData = {};

          fields.forEach(f => {
            filteredData[f] = data[f];
          });

          return filteredData;
        },
        handleSuccess = (data, action) => {
          angular.copy(this.formDescriptor.processResponse ? this.formDescriptor.processResponse(data, action, formHelpers) : data, this.formData);
          $scope.$emit('fk-form-submit', {
            id: this.formDescriptor.id,
            data: this.formData,
            action: action
          });
        },
        getErrorMessage = (error, key) => {
          let errors = this.formDescriptor.errors,
              message =
                errors && errors[key+'_'+error] ||
                errors && errors[error] ||
                this.ERRORMESSAGES[key+'_'+error] ||
                this.ERRORMESSAGES[error] ||
                error;

          return message;
        },
        handleError = (key, error, severity) => {
          if (!error && !error.length) {
            return;
          }

          $log.info('Error during form validation: ['+severity+'], '+key+': ', error);

          let errorCont = angular.element($element[0].querySelector('[fk-error-for="'+key+'"]')),
              field = angular.element($element[0].querySelector('[name="'+key+'"]'));

          if (field.length) {
            field.attr('aria-invalid', true);
          }

          if (!errorCont.length) {
            errorCont = angular.element($element[0].querySelector('.errors'));
          }

          if (!Array.isArray(error)) {
            error = [error];
          }

          error.forEach((e) => {
            errorCont.append('<div fk-error="'+key+'" class="'+severity+'">'+getErrorMessage(e, key)+'</div>');
          });
        },
        handleErrors = (resp, config) => {
          config = config || {};
          if (!config.dontClear) {
            clearErrors();
          }

          if (resp.warnings) {
            Object.keys(resp.warnings).forEach((key) => {
              handleError(key, resp.warnings[key], 'warning');
            });
          }
          if (resp.errors) {
            Object.keys(resp.errors).forEach((key) => {
              handleError(key, resp.errors[key], 'error');
            });
          }
          if (resp.showCaptcha) {
            this.formDescriptor.showCaptcha(resp);
          }
        },
        validateField = (field, config) => {
          config = config || {};
          field = field || config.field || {};

          // retrieve model controller
          let errors = [],
              formFieldEl = angular.element($element[0].querySelector('[name="'+field.name+'"]')),
              mCtrl = formFieldEl.controller('ngModel');

          // angular model validation
          if (mCtrl) {

            // custom validators
            if (field.validators) {
              field.validators.forEach(v => {
                let vErrors = v(field.name, this.formDescriptor, this.formData, $scope.originalData, formHelpers);
                if (vErrors) {
                  if (!Array.isArray(vErrors)) {
                    vErrors = [vErrors];
                  }
                  // TODO check latency/inconsistency
                  vErrors.forEach(e => {
                    mCtrl.$setValidity(e.error, !!e.valid);
                  });

                }
              });

            }

            if (config.forceTouch) {
              mCtrl.$setTouched(true);
            }
            if (mCtrl.$touched && mCtrl.$invalid) {
              errors = errors.concat(Object.keys(mCtrl.$error).filter((k) => mCtrl.$error[k]));
            }
          }

          return errors.length ? errors : null;
        },
        validate = config => {
          config = config || {};

          let error, errors = {};

          // TODO async validation

          if (config.field) {
            error = validateField(config.field, config);
            if (error) {
              errors[config.field] = error;
            }
          } else {
            this.formDescriptor.fields.forEach((field) => {
              error = validateField(field, config);
              if (error) {
                errors[field.name] = error;
              }
            });
          }

          if (!config.dontCallHandleErrors) {
            handleErrors({errors: errors});
          }

          return errors;
        },
        submit = config => {
          config = config || {};

          let errors = config.noValidate ? null : validate({forceTouch: true}),
              url,
              method,
              data,
              dispatch;

          if (errors && Object.keys(errors).length) {
            return;
          }

          url = config.url || this.formDescriptor.url;
          method = config.method || this.formDescriptor.method || "POST";
          data = config.data || (this.formDescriptor.preSubmit ? this.formDescriptor.preSubmit(this.formData, formHelpers) : serialize(this.formData));
          dispatch = config.dispatch || this.formDescriptor.dispatch || "false";

          fkHttp({
            spinner: this.formDescriptor.spinner || 'form-submit',
            method: method,
            dispatch: dispatch,
            url: url,
            headers: config.headers || {'Content-Type': 'application/x-www-form-urlencoded'},
            data: config.data || fkUtils.postData(data)
          }).then(response => {
            if (!response.data) {
              handleErrors({errors: {UNKNOW_ERROR: 'No response received'}});
            } else if (response.data.status !== "SUCCESS") {
              handleErrors(response.data);
            } else {
              handleSuccess(response.data, config.name);
            }
          }).catch(error => {
            handleErrors({errors: {CLIENT_ERROR: error}});
          });

        };

    formHelpers = {
      formCtrl: formCtrl,
      submit: submit,
      validate: validate,
      validateField: validateField,
      clearErrors: clearErrors,
      reset: reset,
      resetField: resetField,
      selectOption: selectOption,
      serialize: serialize,
      filterFields: filterFields,
      handleError: handleError,
      handleErrors: handleErrors,
      handleSuccess: handleSuccess
    };

    $scope.submit = () => {
      let actionName = $scope.$ctrl.defaultAction || 'submit',
          action = $scope.$ctrl.formDescriptor.actions.filter(a => a.name === actionName).shift();

      if (!action) {
        submit();
      } else if (action.action) {
        action.action(this.formDescriptor, this.formData, $scope.originalData, formHelpers);
      } else {
        submit(action);
      }
    };

    $scope.showAddresses = true;
    $scope.reset = reset;
    $scope.validate = validate;

    this.$postLink = () => {
      let fieldE = angular.element($element[0].querySelector('.fields')),
          buttonE = angular.element($element[0].querySelector('.buttons')),
          form = $element.find('form');

      formCtrl = form.controller('form');

      // store original data for reset
      $scope.originalData = angular.copy(this.formData);

      // TODO blur doesn't work for some unknown reason...
      $element.on('blur change click', () => {
        setTimeout(() => validate(), 10);
      });

      $scope.formId = this.formDescriptor.id;

      // render form based on descriptor
      this.formDescriptor.fields.forEach((desc) => {
        let s = $scope.$new();

        s.desc = desc;
        s.data = this.formData;
        s.desc.originalData = s.data;
        s.id = $scope.formId + '_' + desc.name;
        s.form = formCtrl;
        s.fkFormCtrl = this;

        if (desc.type === 'angular') {
          fieldE.append($compile(desc.template)(s));
        } else {
          fieldE.append($compile('<fk-form-field field-name="'+desc.name+'" form="form" form-id="id" descriptor="desc" data="data" fk-form-ctrl="fkFormCtrl" class="'+(desc.cssClass || '')+'"></fk-form-field>')(s));
        }
      });

      // render buttons
      this.formDescriptor.actions.forEach((action) => {
        if (action.action) {
          $scope.actions[action.name] = (e, c) => {
            action.action(this.formDescriptor, this.formData, $scope.originalData, formHelpers, e, c);
            if (e && e.stopPropagation && e.preventDefault) {
              e.stopPropagation();
              e.preventDefault();
            }
          };
        } else if (action.type === 'reset') {
          $scope.actions[action.name] = reset;
        } else if (action.type === 'submit') {
          // default submit handler
        } else {
          $scope.actions[action.name] = () => {
            submit(action);
          };
        }

        if (action.type === 'confirmation') {
          buttonE.append($compile('<fk-confirm-button '+(action.icon ? 'icon="'+action.icon+'"' : '')+' button-class="'+(action.buttonClass || 'button-secondary')+'" ng-attr-title="'+(action.title || '')+'" confirm="actions.'+action.name+'" message="'+(action.message || '')+'" ng-show="'+action.showCondition+ '">'+(action.label || action.name)+'</fk-confirm-button>')($scope));
        } else if (!action.hide) {
          buttonE.append($compile('<button type="'+(action.type === 'submit' ? 'submit' : 'button')+'" class="'+(action.buttonClass || (action.type === 'submit' ? 'button-primary' : 'button-secondary'))+'" ng-click="actions.'+action.name+'($event, $ctrl)" '+(action.validOnly ? 'ng-disabled="!form.$valid"': '')+' '+ (action.showCondition ? 'ng-show="'+action.showCondition+ '"' : '' ) +'>'+(action.icon ? '<fk-icon fk-icon-id="'+action.icon+'"></fk-icon>' : '')+action.label+'</button>')($scope));
        }
      });
    };
  }

  decideIsMobile (bp) {
    return bp === 'md';
  }
}

FkFormCtrl.$inject = ['$scope', '$compile', '$element', '$log', 'fkHttp', 'fkUtils'];

export default FkFormCtrl;
