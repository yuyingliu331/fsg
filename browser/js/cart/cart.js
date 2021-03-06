app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl'
    });
});

app.controller('CartCtrl', function(CheckoutFactory, $state, $scope, CartFactory, AuthService, $log) {
    // is an array of product IDs for not logged in, when logged in becomes a promise for a cart object htat has an array of product objects
    // problem because if we're finding user by session.user, every time page refreshes it doessn't persist...
    CartFactory.getCart()
    .then(function(cart) {
        $scope.cart = cart;
    })
    .catch($log.error);

    AuthService.getLoggedInUser()
    .then(function(user) {
        $scope.user = user;
    })
    .catch($log.error);

    $scope.sendCheckout = function(cart) {
        CheckoutFactory.grabCart(cart);
    };

    $scope.sum = function(arr) {
        var sum = 0;
        arr.forEach(function(num) {
            sum += num.productSum;
        });
        return sum;
    };

    $scope.qtyOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    $scope.removeFromCart = function(productId, userId) {
        CartFactory.removeFromCart(productId, userId)
        .then(function() {
            return CartFactory.getCart();
        })
        .then(function(cart) {
            $scope.cart = cart;
        })
        .catch($log.error);
    };
});

app.factory('CartFactory', function(AuthService, Session, $http, $q, $log, $state) {
    var returnObj = {};

    returnObj.cart = {};

    returnObj.initializeCart = function(productId) {
        this.cart = [productId];
        localStorage.setItem('cart', JSON.stringify(this.cart));
        return this.cart;
    };

    returnObj.routeToAdderFunc = function(productId) {
        AuthService.getLoggedInUser()
        .then(function(user) {
            if (!user) {
                if (!localStorage.getItem('cart')) {
                    returnObj.initializeCart(productId);
                }
                else {
                    returnObj.updateCart(productId);
                }
            }
            else {
                returnObj.addToCart(productId);
            }
        })
        .catch($log.error);
    };

    returnObj.getCart = function() {
        return AuthService.getLoggedInUser()
        .then(function(user) {
            // if a user is logged in, get the cart from the database. if not, get it from localstorage.
            if (user) {
                return $http.get('/api/carts/' + user.id)
                .then(function(cart) {
                    // cart.data.products is an array of products that are in the cart
                    return cart.data.products;
                });
            }
            else {
                var ids = JSON.parse(localStorage.getItem('cart'));
                // reduces array to only unique IDs
                ids = returnObj.uniqueIds(ids);
                // for each of the IDs in the localStorage cart item, it makes a get
                // request to that product's api page and stores that product object
                // in an array.
                ids = ids.map(function(id) {
                    return $http.get('/api/products/' + id)
                    .then(function(product) {
                        return product.data;
                    })
                    .catch($log.error);
                });
                return $q.all(ids);
            }
        })
        .catch($log.error);
    };

    // only gets called if there is a user (through routeToAdderFunc)
    returnObj.addToCart = function(productId) {
        // locating cart based on user ID because cart is associated w user
        return $http.put('/api/carts/' + Session.user.id, {productId: productId})
        .then(function() {
            return;
        })
        .catch($log.error);
    };

    returnObj.removeFromCart = function(productId, userId) {
        return AuthService.getLoggedInUser()
        .then(function(user) {
            if (user) {
                return $http.get('/api/carts/' + userId)
                .then(function(cart) {
                    return $http.delete('/api/carts/' + cart.data.id + '/' + productId)
                })
            }
            else {
                var cart = JSON.parse(localStorage.getItem('cart'));
                var index = cart.indexOf(productId);
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        })
        .catch($log.error);
    };

    // only gets called if there is not a user (through routeToAdderFunc)
    returnObj.updateCart = function(productId) {
        this.cart = JSON.parse(localStorage.getItem('cart'));
        if (this.cart.indexOf(productId) !== -1) {
            alert('This item is already in your cart! Update the quantity on the \'View Cart\' page');
        }
        else {
            this.cart.push(productId);
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
        return this.cart;
    };

    returnObj.migrateCart = function() {
        var cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            cart.forEach(function(product) {
                returnObj.addToCart(product);
            });
        }
        $state.go('home');
    };

    returnObj.uniqueIds = function(arr) {
        var uniques = [];
        for (var i = 0; i < arr.length; i++) {
            if (uniques.indexOf(arr[i]) === -1) {
                uniques.push(arr[i]);
            }
        }
        return uniques;
    }
    return returnObj;
});
