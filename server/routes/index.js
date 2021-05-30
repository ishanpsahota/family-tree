const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const CryptoJS = require('crypto-js');
const member = require('../models/member');


// const bcrypt = require('bcrypt-nodejs');
// const fs = require('fs');

// const path = require('path');
// const auth = require('http-auth');
// const multer = require('multer');


// var nodem = require('nodemailer');

// const admindeets = auth.basic({
//     file: path.join(__dirname, '../adminsdeets.htpasswd')
// });

// Models
const Member = mongoose.model('member')
const Tree = mongoose.model('tree')

const url = `http://localhost:${process.env.PORT}`

function getRel(gender, rel) {

    var newrel = ""
    console.log(gender)
    console.log(rel)

    if(gender == "male")
    {
        if(rel == "son" || rel == "daughter")
            {newrel = "father"}
        if(rel == "father" || rel == "mother")
            {newrel = "son"}
        if(rel == "brother" || rel == "sister")
            {newrel = "brother"}
    }
        
    
    if(gender == "female")
    {
        if(rel == "son" || rel == "daughter")
            {newrel = "mother"}
        if(rel == "father" || rel == "mother")
            {newrel = "daughter"}
        if(rel == "brother" || rel == "sister")
            {newrel = "sister"}
    }
    
    console.log(newrel)
    return newrel

}

router.get('/', function(req, res) {
    res.send("Wrong Place you're hitting it from ;-)")
})

router.post('/login', function(req, res){
    if(!req.body.email || !req.body.password) {
        console.log("exp-rtr-lgn-mpt")
        return
    } 
    else {
        console.log('email: ', req.body.email)
        console.log('pass: ', req.body.password)
        
        Member.authenticate(req.body.email, req.body.password, function(error, member)
        {
            console.log("exp-rtr-lgn-dng")
            if(error) 
            {
                console.log('error: ', error)
                res.send({
                    success: false,
                    error: error,
                    status: 500
                })
            }
            else if(!member)
            {
                console.log('nf')
                res.send({
                    success: false,
                    error: "Not found",
                    status: 400
                })
            }
            else if(member)
            {
                // return memberData = {
                //     member
                // }                
                console.log('member: ', member);
                res.send({
                    success: true,
                    member,
                    status: 200
                })
            }
            else res.sendStatus(400)
        });
    }
})

router.post('/register', function(req, res){

    // console.log(req.body)

    if(!req.body.email || !req.body.password || !req.body.gender || !req.body.name || !req.body.trees || !req.body.relationships) {
        return res.sendStatus(400)
    }
    else
    {
        // Finding member if exists
        Member.findOne({ email: req.body.email }).exec(function(err, member) {
            // if error in mongo
            if(err) return res.sendStatus(400)
            // if member exists, return
            else if(member) return res.sendStatus(409)
            // else register the member
            else
            {
                var newMember = req.body
                // console.log(newMember)

                /* register the member */
                Member.create(newMember, function(err, memberRegistered) {
                    // if error in mongo
                    if(err) return res.send(400)
                    // if not able to register the member
                    if(!memberRegistered) return res.sendStatus(401)
                    // if member registered
                    if(memberRegistered)
                    {
                        // console.log(req.body.gender + " " + req.body.relationships.name)
                        // console.log(getRel(req.body.gender, req.body.relationships.name))

                        // updating relation in creator doc
                        var relation = {
                            name: getRel(req.body.gender, req.body.relationships.name),
                            with: memberRegistered._id,
                            treeId: req.body.trees.treeId
                        }

                        // console.log(relation)                        

                        // pushing relation in tree owner
                        Member.findByIdAndUpdate(req.body.relationships.with, { $push : {relationships: relation}}, function(err, memberUpdated) {
                            // if error in mongo
                            if(err) 
                            {
                                console.log(err)
                                return res.send({
                                    status: 400,
                                    error: 'Bad Request'
                                })
                            }
                            // if not able to update relation in tree owner
                            if(!memberUpdated)
                            {
                                return res.send({
                                    status: 401,
                                    error: 'Error updating member details.'
                                })
                            }
                            // if member updated 
                            if(memberUpdated) {

                                // adding member in tree
                                var newTreeMember = {

                                    memberId: memberRegistered._id,
                                    relWithOwner: relation.name,
                                    parentId: null
                                }

                                // finding tree & pushing member deets
                                Tree.findByIdAndUpdate(req.body.trees.treeId, { $push: {members: newTreeMember } }, function(err, treeMemberAdded) {

                                    // console.log(req.body.relationships)
                                    // if error  in mongo
                                    if(err)
                                    {
                                        console.log(err)
                                        return res.send({
                                            status: 400,
                                            error: "Bad Request updating tree members"
                                        })
                                    }
                                    // if not able to push member into tree
                                    if(!treeMemberAdded)
                                    {
                                        return res.send({
                                            status: 401,
                                            error: "Error updating tree members"
                                        })
                                    }
                                    // if pushed member into tree
                                    if(treeMemberAdded) {
                                        // return res.sendStatus(200)
                                        // console.log(req.body.relationships)
                                        var treeP = getRel(req.body.gender, req.body.relationships.name)
                                        if(treeP == "father" || treeP == "mother")
                                        {
                                            // console.log("father/mother")
                                            Tree.findOneAndUpdate({ "_id":req.body.trees.treeId,"members.memberId": req.body.relationships.with }, { $set: {"members.$.parentId": memberRegistered._id}  }).exec(function(err, treeUpdated) {

                                                if(err) { console.log(err); return res.sendStatus(400)}
                                                if(!treeUpdated) return res.sendStatus(401)
                                                if(treeUpdated) {
    
                                                    return res.sendStatus(200)
    
                                                }
    
                                            })
                                        }
                                        else return res.sendStatus(200)
                                    }

                                })

                            }
                        })

                        // return res.sendStatus(200)
                    }
                })
            }
        })
    }

})

router.post('/owner', function(req, res) {

    if(!req.body.email || !req.body.password || !req.body.gender || !req.body.name || !req.body.dOb) {
        console.log("exp-rtr-ownr-mpt")
        return res.send({
            status: 406,
            error: 'Details missing. Fill the registration form completely.'
        })
    }
    else
    {        
        Member.findOne({ 'email' : req.body.email } ).exec(function(err, member) {
            
            if(err) {
                console.log("exp-rtr-ownr-err")
                return res.send({
                    status: 400,
                    error: 'Error in DB'
                })
            } 
            else if(member) {
                console.log("exp-rtr-lgn-ownr-ext")
                return res.send({
                    status: 302,
                    error: 'Already exists'
                })
            }
            else
            {
                console.log("exp-rtr-ownr-dng")
                var newMember = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    gender: req.body.gender,
                    dateOfBirth: req.body.dOb,
                    relationships: [],
                    trees: []
                }

                Member.create(newMember, function(err, memberRegistered) {
                    if(err) {                        
                        return res.send({
                            status: 400,
                            error: 'Bad Request'
                        })
                    } 
                    else if(!memberRegistered) {                        
                        return res.send({
                            status: 401,
                            error: 'Unauthorized'
                        })
                    }
                    else if(memberRegistered)
                    {
                        return res.send({
                            status: 200
                        })
                    }
                })
            }
        })
    }

})

router.post('/new', function(req, res) {

    // console.log(req.body)

    if(!req.body.name || !req.body.ownerId || !req.body.members)  { console.log("mpt"); return res.sendStatus(400)}
    else
    {
        Tree.findOne({ 'name': req.body.name }).exec(function(err, tree) {

            if(err) { console.log("nmpt"); return res.sendStatus(400)}
            else if(tree) res.sendStatus(409)
            else
            {
                
                var treeData = req.body

                // console.log(treeData)

                Tree.create(treeData, function(err, treeCreated) {
                    if(err) { console.log("nemp-crterr"); return res.sendStatus(400)}
                    else if(treeCreated)
                    {
                        Tree.findOne({ 'name': req.body.name}).exec(function(err, treeFound) {
                            if(err) { return res.sendStatus(404) }
                            if(treeFound) {

                                var newTree = [{
                                    name: req.body.name,
                                    treeId: treeFound._id,
                                    owner: true
                                }]

                                // console.log(newTree)

                                Member.findByIdAndUpdate(req.body.ownerId, { "trees": newTree  }, function(err, memberUpdated) {
                                    if(err) return res.sendStatus(400)
                                    if(!memberUpdated) return res.sendStatus(401)
                                    if(memberUpdated) {
                                        return res.sendStatus(200)
                                    }
                                })

                            }
                        })                        
                    }
                })
            }

        })
    }

})

router.get('/trees/:id', function(req, res) {
    if(!req.params.id) return res.sendStatus(401)
    else
    {
        const id = req.params.id
        Tree.find({ $or: [ { 'ownerId': id }, { "members.memberId": id } ] }).exec(function(err, trees) {
            if(err) return res.send({
                status: 400,
                error: 'Bad Request'
            })
            else if(!trees) return res.send({
                status: 404,
                error: 'Tree Not Found'
            })
            else {
                res.send({ 
                    status: 200,
                    trees: trees
                })
            }
        })
    }
})

router.get('/viewtree/:id', function(req, res) {

    if(!req.params.id) return res.sendStatus(401)
    else
    {
        // const id = CryptoJS.AES.decrypt(req.params.id, 'ishanpsahota@m3ral@wda').toString(); 
        const id = req.params.id
        // console.log(id)
        Tree.findOne({randomId : id}).exec(function(err, tree) {
            if(err) return res.sendStatus(400)
            else if(!tree) return res.sendStatus(404)
            else {
                res.send({ 
                    status: 200,
                    tree: tree
                 })
            }
        })
    }

})

router.get('/members/:id/:treeid', function(req, res) {

    if(!req.params.id || !req.params.treeid) return res.sendStatus(400)
    else
    {
        // console.log(req.params)
        const id = req.params.id
        const treeid = req.params.treeid

        Member.findOne({_id: id}, function(err, memberFound) {

            if(err) {
                return res.send({
                    status: 400,
                    error: err
                })
            }
            if (!memberFound) return res.sendStatus(401)
            if(memberFound) {

                Member.find({ "trees.treeId": treeid }).exec(function(err, members) {

                    if(err || !members) return res.sendStatus(401)
                    if(members)
                    {
                        return res.send({
                            status: 200,
                            members: members
                        })
                    }

                })

            }

        })
    }

})

router.get('/hierarchy/:id/:treeid', function(req, res) {

    var treeMems = []

    if(!req.params.id || !req.params.treeid) return res.sendStatus(400)
    else
    {
        const id = req.params.id
        const treeid = req.params.treeid

        Member.findById(id, function(err, memberFound) {
            if(err) return res.sendStatus(401)
            if(!memberFound) return res.sendStatus(404)
            if(memberFound) {

                Tree.findById(treeid, function(err, treeFound) {
                    if(err) return res.sendStatus(400)
                    if(!treeFound) return res.sendStatus(404)
                    if(treeFound) {                        

                        treeMems = treeFound.members
                        treeMems.forEach(member => {
                            
                            const pid = member.parentId
                            // console.log(pid)

                            if(pid)
                            {                                
                                
                                treeMems.forEach(treeMemagain => {

                                    if(treeMemagain.relWithOwner == 'sister' || treeMemagain.relWithOwner == 'brother')
                                    {
                                        const setId = treeMemagain._id
                                        console.log(setId)

                                        Tree.findOneAndUpdate({"members._id": setId}, { $set:  {"members.$.parentId": pid} } ,function(err, pIdupdated) {

                                            if(err) { console.log(err); return res.end("err")}
                                            if(!pIdupdated) return res.end("ERR")
                                            if(pIdupdated) return res.end("OK")

                                        })

                                    }
                                })
                                
                            }

                        });                        

                    }
                })
                

            }
        })
    }

})

module.exports = router;
