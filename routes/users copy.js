var express = require('express');
var router = express.Router();

let dataUsers = [{
        id: '1',
        name: 'anton',
        email: 'dsfsd@gmail.com',
        age: '21',
        photo: 'sdfsdfsdfsdfsdfsdfsdfsdf'
    },
    {
        id: '2',
        name: 'budi',
        email: 'dfsfsdf@mail.com',
        age: '22',
        photo: 'sdfsdgewwerwerwerwerwer'
    },
];

const mytodo = function (ourtodo, title) {
    const index = dataUsers.findIndex(function (todo, index) {
        return todo.id === title;
    });
    if (index == -1) {
        console.log('gagal')
    } else {
        return ourtodo[index];
    }
}
let findme = mytodo(dataUsers, '1')
if (findme) {
    console.log(findme.name);
}

/* GET users listing. */
router.get('/anto/:userid', async function (req, res, next) {
    let temukan = await mytodo(dataUsers, req.params.userid);
    res.send(temukan.name);
});

router.get('/andi/', function (req, res, next) {
    res.send(dataUsers);
});

module.exports = router;