/* jslint browser: true */
/* global spyOn, jasmine, expect, sinon */

define([
	'jquery',
	'models/WorkflowStateModel',
	'models/SiteModel'
], function($, WorkflowStateModel, SiteModel) {
	xdescribe('models/SiteModel', function() {
		var testSiteModel;

		beforeEach(function() {
			var ajaxStub = sinon.stub($, "ajax");
			testSiteModel = new SiteModel();
		});

		afterEach(function() {
			$.ajax.restore();
		});

		it('Expects that two ajax calls were made', function() {
			expect($.ajax.calledTwice);
		});

		it('Expects that the sites attribute is initially set to an empty object', function() {
			expect(testSiteModel.get('sites')).toEqual({});
		});

		it('Expects that an ajax call is made for waterService with the correct url', function() {
			testSiteModel.fetch({'location': {latitude : 43.0, longitude : -100.0}}, 5);
			expect($.ajax.calledWithMatch({url: "waterService/?format=rdb&bBox=-92.426775,42.123607,-92.231428,42.268330&outputDataTypeCd=iv,dv&hasDataTypeCd=iv,dv&siteType=OC,LK,ST,SP,AS,AT"}));
		});

	});
});