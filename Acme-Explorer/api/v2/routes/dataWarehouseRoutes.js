'use strict';

module.exports = function(app) {
    var dataWareHouse = require('../controllers/dataWarehouseController');
    /**
     * Get a list of all indicators or post a new computation period for rebuilding
     * RequiredRole: Administrator
     * @section dataWareHouse
     * @type get post
     * @url /dataWareHouse
     * @param [string] rebuildPeriod
     * 
     */
    app.route('/v2/dataWareHouse')
        .get(dataWareHouse.list_all_indicators)
        .post(dataWareHouse.rebuildPeriod);

    /**
     * Get a list of last computed indicator
     * RequiredRole: Administrator
     * @section dataWareHouse
     * @type get
     * @url /dataWareHouse/latest
     *
     */
    app.route('/v2/dataWareHouse/latest')
        .get(dataWareHouse.last_indicator);
};