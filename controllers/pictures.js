const mongoose = require('mongoose');
const Picture = require('../models/picture');

module.exports = {

    /**
     * show all data in pictures
     */
    index: (req, res, nex) => {
        Picture.find().exec().then(pictureData => {
            res.status(200).json({
                message: 'handling show all data to /users',
                count: pictureData.length,
                showPicture: pictureData
            });
        }).catch(err => {
            console.log(err);
            res.status(404).json({error: err});
        });
    },

    /**
     * show specific data in pictures by id
     */
    show: (req, res, next) => {
        const id = req.params.id;
        Picture.findById(id).exec().then(pictureData => {
            console.log(pictureData);
            res.status(200).json({
                massage: 'handling show data to /pictures',
                showpicture: pictureData,
                store_picture: {
                    href: 'pictures',
                    method: 'POST'
                },
                update_picture: {
                    href: 'pictures/'+pictureData._id,
                    method: 'PUT'
                },
                destroy_picture: {
                    href: 'pictures/'+pictureData._id,
                    method: 'DELETE'
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(404).json({error: err});
        });
    },

    /**
     * update specific data in pictures by id
     */
    update: (req, res, next) => {
        const id = req.params.id;
        const updateOperation = {};
        for(const ops of req.body){
            updateOperation[ops.propName] = ops.value;
        }
        Picture.update({_id: id}, {$set: updateOperation}).exec().then(result => {
            console.log(result);
            res.status(200).json(result)
        }).catch(err => {
            console.log(err);
            res.status(406).json({error: err})
        });
    },

    /**
     * delete data in pictures by id
     */
    destroy: (req, res, next) => {
        const id = req.params.id;
        Picture.remove({_id: id}).exec().then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(406).json({error: err})
        });
    }
};