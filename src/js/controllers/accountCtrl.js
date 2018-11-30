import './../../css/account.css';

class AccountCtrl {
  constructor($rootScope, $scope, fkUtils, fkUserService) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.fkUtils = fkUtils;
    this.fkUserService = fkUserService;

    $scope.ismobile = this.decideIsMobile(fkUtils.getActiveBreakpoint());
    $scope.topics = [
      {
        title:'Address Book',
        path: 'addresses'
      },
      {
        title: 'Payment Options',
        path:'paymentMethods'
      },
      {
        title: 'Credits',
        path: 'credits'
      },
      {
        title:'Email',
        path: 'emailSettings'
      },
      {
        title:'Password',
        path: 'passwordSettings'
      },
      {
        title: 'Notifications',
        path:'notifications'
      }
      /* example
      {
        title:'Example teve',
        entries: [
          {
            title:'Example sub',
            path: 'example'
          }
        ]
      } */
    ];

    $scope.newTopics = [
      {
        title:'Address Book',
        path: 'addresses'
      },
      {
        title: 'Payment Options',
        path:'paymentMethods'
      },
      {
        title: 'DeliveryPass',
        path: 'deliveryPass'
      },
      {
        title: 'Credits',
        path: 'credits'
      },
      {
        title:'Email',
        path: 'emailSettings'
      },
      {
        title:'Password',
        path: 'passwordSettings'
      },
      {
        title: 'Notifications',
        path:'notifications'
      }
    ];

    if (this.fkUserService.user && this.fkUserService.user.fdxDpEnabled) {
        $scope.dpPropertyFlag = true;
    } else {
        $scope.dpPropertyFlag = false;
    }

    $scope.state = 'account.detail';

    $scope.$on( 'fk-account-details-loaded', () => {
      if ( $scope.ismobile ) {
        $scope.ismobiledetails = true;
      }
    } );

    $scope.$on( 'fk-account-main-back', () => {
      if ( $scope.ismobile ) {
        $scope.ismobiledetails = false;
      }
    } );

    $scope.$on('breakpoint-change', (ev, data) => {
      $scope.ismobile = this.decideIsMobile(data.breakpoint);
    });

    $rootScope.$on( '$locationChangeSuccess', ( event, newUrl ) => { // back from submenu show menu again on mobile
      let actualUrl = newUrl.substring( newUrl.lastIndexOf( '/' ) + 1, newUrl.length );

      if ( $scope.ismobile && actualUrl === 'account' ) {
        $scope.ismobiledetails = false;
      }
    });
  }

  decideIsMobile (bp) {
    return bp === 'xs' || bp === 'sm';
  }

}

AccountCtrl.$inject = ['$rootScope', '$scope', 'fkUtils', 'fkUserService'];

export default AccountCtrl;
