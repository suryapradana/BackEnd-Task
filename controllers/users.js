const mongoose = require('mongoose');
const User = require('../models/user');
const Picture = require('../models/picture');

module.exports = {

    /**
     * show all data in users
     */
    index: (req, res, next) => {
        User.find().populate('pictures').exec().then(userData => {
            console.log(userData);
            res.status(200).json({
                massage: 'handling show all data to /users',
                count: userData.length,
                showUser: userData
            });
        }).catch(err => {
            console.log(err);
            res.status(404).json({error: err});
        });
    },

    /**
     * store/post data to users
     */
    store: (req, res, next) => {
        const postUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });
        postUser.save().then(result => {
            console.log(result)
            res.status(201).json({
                massage: 'handling post request to /users',
                postUser: postUser,
                show_user: {
                    href: 'users/'+postUser._id,
                    method: 'GET'
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(406).json({error: err});
        });
    },

    /**
     * show specific data in users by id
     */
    show: (req, res, next) => {
        const id = req.params.id;
        User.findById(id).populate('pictures').exec().then(userData => {
            console.log(userData);
            res.status(200).json({
                massage: 'handling show data to /users',
                showUser: userData,
                store_user: {
                    href: 'users',
                    method: 'POST'
                },
                update_user: {
                    href: 'users/'+userData._id,
                    method: 'PUT'
                },
                destroy_user: {
                    href: 'users/'+userData._id,
                    method: 'DELETE'
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(404).json({error: err});
        });
    },

    /**
     * update specific data in users by id
     */
    update: (req, res, next) => {
        const id = req.params.id;
        const updateOperation = {};
        for(const ops of req.body){
            updateOperation[ops.propName] = ops.value;
        }
        User.update({_id: id}, {$set: updateOperation}).exec().then(result => {
            console.log(result);
            res.status(200).json(result)
        }).catch(err => {
            console.log(err);
            res.status(406).json({error: err})
        });
    },

    /**
     * delete data in users by id
     */
    destroy: (req, res, next) => {
        const id = req.params.id;
        User.remove({_id: id}).exec().then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(406).json({error: err})
        });
    },

    /**
     * store/post new picture to pictures, related to id
     * users has many pictures
     */
    storeNewPicture: async (req, res, next) => {
        const id = req.params.id;
        const newPicture = new Picture({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            type: req.body.type
        });
        const userData = await User.findById(id);
        newPicture.users = userData;
        await newPicture.save();
        userData.pictures.push(newPicture);
        await userData.save();
        res.status(201).json(newPicture);
    }

};
