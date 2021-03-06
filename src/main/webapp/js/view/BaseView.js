var ENDDAT = ENDDAT || {};

ENDDAT.view = ENDDAT.view || {};

/*
 * View which should be extended to implement a view which renders using a template.
 * When extending, the templateName should be the name of a template that was preloaded.
 * @constructor
 */
ENDDAT.view.BaseView = Backbone.View.extend({

	templateName : '',

	/**
	 * Renders the object's template using it's context into the view's element.
	 * @returns {BaseViewAnonym$0}
	 */
	render : function() {
		var html = this.template(this.context);
		this.$el.html(html);

		return this;
	},

	/**
	 * @constructs
	 * @param {Object} options
	 *		@prop router {Backbone.Router instance} - defaults to null
	 *		@prop template {Handlers template function} - defaults to loading the template from ENDDAT.templates - this is useful for testing
	 *		@prop context {Object} to be used when rendering templateName - defaults to {}
	 * @returns ENDDAT.view.BaseView
	 */
	initialize : function(options) {
		options = options || {};

		if (!this.context) {
			this.context = {};
		}
		if (options.context) {
			$.extend(this.context, options.context);
		}

		this.router = options.router || null;

		if (_.has(options, 'template')) {
			this.template = options.template;
		}
		else {
			this.template = ENDDAT.templates.getTemplate(this.templateName);
		}

		Backbone.View.prototype.initialize.apply(this, arguments);
		this.render();
	},

	/** COMMON navigation functions that might be used for many views */
	goHome: function() {
		this.router.navigate('#!home', {trigger: true});
	},

	showWarningDialog : function(msg) {
		var $warningModal = $('#warning-modal');
		if (msg) {
			$warningModal.find('.modal-body').html(msg);
		}
		$warningModal.modal('show');
	},

	setVisibility : function(el, on) {
		if (on) {
			el.show();
		}
		else {
			el.hide();
		}
	}

});


