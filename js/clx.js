(function() {
	var CLX = window.$clx = function() { return new CLX(); };
	CLX.element = {
		create: function() {
			if (arguments.length > 0) { var name = arguments[0]; }
			if (arguments.length > 1) { var options = arguments[1] ? arguments[1] : {}; }
			var e = document.createElement(name);
			for (var key in options) { e[key] = options[key]; }
			return e;
		}
	};
	CLX.config = {
		form:  'jx_payment_form',
		error: 'jx_payment_errors'
	};
	CLX.stripe = function() {
		this.keys    = ['number', 'cvc', 'exp_month', 'exp_year'];
	}
	CLX.stripe.prototype = {
		send: function() {
			CLX.form = document.getElementById(CLX.config.form);
			var params = {};
			var size = this.keys.length;
			for (var i = 0; i < size; i++) {
				params[this.keys[i]] = CLX.form[this.keys[i]].value;
			}
   		 	Stripe.createToken(params, this.loadToken);
		},
		loadToken: function(status, response) {
			if (response.error) {
				var e = document.getElementById(CLX.config.error);
				e.innerHTML = '<li>'+response.error.message+'</li>';
				e.style.display = 'block';
			} else {
				var e = $clx.element.create('input', {
					type: 'hidden',
					name: 'token',
					value: response.id
				});
				CLX.form.appendChild(e);
				CLX.form.submit();
			}
    	}
	};
})();
