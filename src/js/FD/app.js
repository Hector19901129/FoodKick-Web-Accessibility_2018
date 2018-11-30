export default () => {

  var foodkickApp = angular.module('foodkickApp');

  foodkickApp.config(['$locationProvider', '$httpProvider', 'lazyImgConfigProvider', '$stateProvider', '$urlRouterProvider', '$animateProvider', '$windowProvider', 'signinErrorProvider',
    function ($locationProvider, $httpProvider, lazyImgConfigProvider, $stateProvider, $urlRouterProvider, $animateProvider, $windowProvider, signinErrorProvider) {

      $httpProvider.defaults.withCredentials = true;

      // For any unmatched url, redirect to '/'
      $urlRouterProvider.otherwise("/");

      if ($windowProvider.$get().location.search === '?action=NOMATCH') {
        let w = $windowProvider.$get();
        let hash = w.location.hash;
        w.history.replaceState(w.history.state, '', '/' + hash);

        signinErrorProvider.setError('NOMATCH', 'Error');
      }

      $stateProvider
        .state('fullHeader', {
          templateUrl: 'templates/fullHeader.html'
        })
        .state('collapsedHeader', {
          templateUrl: 'templates/collapsedHeader.html'
        })
        .state('home', {
          url: '/',
          templateUrl: 'templates/fdHome.html',
          controller: 'fdHomeCtrl',
          controllerAs: '$ctrl',
          parent: 'fullHeader'
        })
        .state('fkHome', {
          url: '/fkhome',
          templateUrl: 'templates/fkHome.html',
          controller: 'fkHomeCtrl',
          controllerAs: 'fkHomectrl',
          parent: 'fullHeader'
        })
        .state('search', {
          url: '/search/:searchKey?page',
          templateUrl: 'templates/search.html',
          controller: 'fkSearchPageCtrl',
          controllerAs: 'searchctrl',
          parent: 'collapsedHeader',
          resolve: {
            User: ['fkCartService', 'fkUserService', function (fkCartService, fkUserService) {
              return fkUserService.checkLogin();
            }],
            searchData: ['fkSearchService', '$location', 'fkUtils', '$stateParams', function(fkSearchService, $location, fkUtils, $stateParams) {
              let params = $location.search();
              let search = '';
              let page;
              let currentSortBy;
              let currentFilters;
              let currentAscending;

              if (fkSearchService.newSearchKey) {
                search = fkSearchService.newSearchKey;
                page = 1;
                currentSortBy = null;
                currentFilters = null;
                currentAscending = null;
              } else {
                search = $stateParams.searchKey;
                page = params.page ? params.page : 1;
                currentFilters = params.filters ? fkUtils.filtersFromString(params.filters) : null;
                currentSortBy = params.sort ? params.sort : null;
                currentAscending = params.ascending ? params.ascending : null;
              }

              return fkSearchService.search(search, currentFilters, currentSortBy, currentAscending, {
                onlyAvailable: true,
                pageSize: 24,
                activePage: page
              }).then(function(response) {
                fkSearchService.newSearchKey = null;
                return response;
              });
            }]
          }
        })
        .state('product', {
          url: '/product/:productId',
          templateUrl: 'templates/pdp.html',
          controller: 'fkPDPCtrl',
          controllerAs: 'ctrl',
          parent: 'collapsedHeader',
          resolve: {
            Product: ['fkCartService', 'fkUserService', 'fkProductService', '$stateParams', function (fkCartService, fkUserService, fkProductService, $stateParams) {
              return fkUserService.checkLogin().then(() => fkProductService.getProduct($stateParams.productId, {
                force: true,
                async: true
              }));
            }]
          }
        })
        .state('product.withName', {
          url: '/:name?',
          controller: ['$state', function ($state) {
            $state.go('^');
          }]
        })
        .state('browse', {
          url: '/browse/:id?page',
          templateUrl: 'templates/plp.html',
          controller: 'fkPLPCtrl',
          controllerAs: 'ctrl',
          parent: 'collapsedHeader',
          resolve: {
            User: ['fkCartService', 'fkUserService', function (fkCartService, fkUserService) {
              return fkUserService.checkLogin();
            }],
            Navigationloaded: ['fkGlobalNavService', '$stateParams', function (fkGlobalNavService, $stateParams) {
              fkGlobalNavService.setCurrentItem($stateParams.id);
              return fkGlobalNavService.loaded;
            }],
            browseData: ['fkCategoryService', '$location', 'fkUtils', '$stateParams', function(fkCategoryService, $location, fkUtils, $stateParams) {
              let params = $location.search();
              let browse = $stateParams.id;
              let page = params.page ? params.page : 1;
              let currentFilters = params.filters ? fkUtils.filtersFromString(params.filters) : null;
              let currentSortBy = params.sort ? params.sort : null;
              let currentAscending = params.ascending ? params.ascending : null;

              return fkCategoryService.getCategory(browse, currentFilters, currentSortBy, currentAscending, {
                onlyAvailable: false,
                pageSize: 24,
                activePage: page
              }).then(function(response) {
                fkCategoryService.newBrowseKey = null;
                return response;
              });
            }]
          }
        })
        .state('browse.withName', {
          url: '/:name?',
          controller: ['$state', function ($state) {
            $state.go('^');
          }]
        })
        .state('department', {
          url: '/department/:id',
          templateUrl: 'templates/department.html',
          controller: 'fkDepartmentCtrl',
          controllerAs: '$ctrl',
          parent: 'collapsedHeader',
          resolve: {
            User: ['fkCartService', 'fkUserService', function (fkCartService, fkUserService) {
              return fkUserService.checkLogin();
            }],
            DepartmentLoaded: ['fkGlobalNavService', '$stateParams', function (fkGlobalNavService, $stateParams) {
              fkGlobalNavService.setCurrentItem($stateParams.id);
              return fkGlobalNavService.loaded;
            }]
          }
        })
        .state('department.withName', {
          url: '/:name?',
          controller: ['$state', function ($state) {
            $state.go('^');
          }]
        })
        .state('changepassword', {
          url: '/changepassword',
          templateUrl: 'templates/changepassword.html',
          controller: 'fkChangePasswordCtrl',
          controllerAs: '$ctrl',
          parent: 'collapsedHeader'
        })
        .state('help', {
          url: '/help',
          templateUrl: 'templates/help.html',
          controller: 'helpCtrl',
          resolve: {
            topicsData: ['fkHelpPagesService', function (fkHelpPagesService) {
              return fkHelpPagesService.get()
                .then(function (resp) {
                  return resp.data;
                });
            }],
            User: ['fkCartService', 'fkUserService', function (fkCartService, fkUserService) {
              return fkUserService.checkLogin();
            }]
          },
          parent: 'collapsedHeader'
        })
        .state('help.detail', {
          url: '/:partial/:subpartial',
          templateUrl: 'templates/fkHelpDetail.html',
          controller: 'fkHelpDetailCtrl',
          controllerAs: '$ctrl'
        })
        .state('account', {
          url: '/account',
          templateUrl: 'templates/account.html',
          controller: 'accountCtrl',
          parent: 'collapsedHeader',
          resolve: {
            User: ['fkCartService', 'fkUserService', function (fkCartService, fkUserService) {
              return fkUserService.checkLogin();
            }]
          }
        })
        .state('account.detail', {
          url: '/:partial/:subpartial',
          templateUrl: function ($stateParams) {
            return 'templates/' + ($stateParams.subpartial.length > 0 ? $stateParams.subpartial : $stateParams.partial) + '.html';
          },
          controllerProvider: ['$stateParams', function ($stateParams) {
            return ($stateParams.subpartial.length > 0 ? $stateParams.subpartial : $stateParams.partial) + 'Ctrl';
          }],
          resolve: {
            pageLoaded: ['$rootScope', $rootScope => {
              return () => $rootScope.$broadcast('fk-account-details-loaded', {});
            }],
            goBack: ['$rootScope', '$state', ($rootScope, $state) => {
              return () => {
                $rootScope.$broadcast('fk-account-main-back', {});
                document.getElementById('fakebody').scrollTop = 0;
                $state.go('^');
              };
            }]
          }
        })
        .state('orderhistory', {
          url: '/orderhistory',
          templateUrl: 'templates/fkOrderHistory.html',
          controller: 'fkOrderHistoryCtrl',
          controllerAs: '$ctrl',
          parent: 'collapsedHeader',
          resolve: {
            User: ['fkCartService', 'fkUserService', function (fkCartService, fkUserService) {
              return fkUserService.checkLogin();
            }]
          }
        })
        .state('pastorders', {
          url: '/pastorders/:orderId',
          templateUrl: 'templates/pastOrders.html',
          controller: 'fkPastOrdersCtrl',
          controllerAs: '$ctrl',
          parent: 'collapsedHeader',
          resolve: {
            User: ['fkCartService', 'fkUserService', function (fkCartService, fkUserService) {
              return fkUserService.checkLogin();
            }],
            Navigationloaded: ['fkGlobalNavService', '$stateParams', function (fkGlobalNavService, $stateParams) {
              fkGlobalNavService.setCurrentItem($stateParams.id);
              return fkGlobalNavService.loaded;
            }]
          }
        })
        .state('pastitems', {
          url: '/pastitems?page',
          templateUrl: 'templates/pastItems.html',
          controller: 'fkPastItemsCtrl',
          parent: 'collapsedHeader',
          resolve: {
            User: ['fkCartService', 'fkUserService', function (fkCartService, fkUserService) {
              return fkUserService.checkLogin();
            }]
          }
        })
        .state('receipt', {
          url: '/receipt/:orderId',
          templateUrl: 'templates/fkReceiptPage.html',
          controller: 'fkReceiptPageCtrl',
          parent: 'collapsedHeader',
          resolve: {
            User: ['fkUserService', function (fkUserService) {
              return fkUserService.checkLogin();
            }]
          }
        })
        .state('not-found', {
          url: '/not-found',
          templateUrl: 'templates/404.html',
          controller: 'fk404Ctrl',
          controllerAs: '$ctrl',
          parent: 'collapsedHeader'
        });

      lazyImgConfigProvider.setOptions({
        offset: 1000,
        errorClass: 'img-error',
        container: angular.element(document.getElementById('fakebody'))
      });

      $animateProvider.classNameFilter(/\banimated\b/);
      $locationProvider.hashPrefix('!');
      $locationProvider.html5Mode(true);
    }
  ]).run(['$rootScope', '$log', 'fkBoldChatService', 'fdMetaService', 'fkUtils', 'fkModifiableOrders',
    function ($rootScope, $log, fkBoldChatService, fdMetaService, fkUtils, fkModifiableOrders) {
      $rootScope.metaInfoService = fdMetaService;
      $rootScope.$on('ngDialog.opened', function (e, $dialog) {
        setTimeout(function () {
          var dialog;
          if (dialog) {
            dialog = $dialog[0];
            var input = dialog.querySelector('[autofocus]');
            if (!input) {
              input = dialog.querySelector('input,select');
            }
            if (input) {
              input.focus();
            }
          }
        }, 500);
      });

      $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams) {
        fkModifiableOrders.checkModifiableOrders(10);
        fdMetaService.setMetaInfo(toParams.partial || toParams.id);
      });

      $rootScope.$on('$stateChangeError', function (ev, toState, toParams, fromState, fromParams, error) {
        if (fkUtils.isDeveloper()) {
          $log.warn('[state change error]', ev, toState, toParams, error);
        }
      });

      $rootScope.$on('$stateNotFound', function (ev, unfoundState) {
        if (fkUtils.isDeveloper()) {
          $log.warn('[state not found]', ev, unfoundState);
        }
      });

      fkBoldChatService.getBoldChat();
    }]);

  if (!window.FOODKICK_DEV) {
    foodkickApp.config(['$compileProvider', function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    }]);
  }

};
