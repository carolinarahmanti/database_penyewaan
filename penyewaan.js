const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// create MySql Connectuin
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sewa_kendaraan"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

// ------------------------------ crud penyewa ------------------------------ //

app.get("/penyewaan", (req,res) => {
    let sql = "select * from penyewa" 

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                penyewa: result
            }
        }
        res.json(response)
    })
})

app.get("/penyewaan/:id_pelanggan", (req, res) => {
    let data = {
        id_penyewa: req.params.id_penyewa
    }
    let sql = "select * from penyewa where id_penyewa"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }
        } else { 
            response = {
                count: result.length, 
                penyewa: result 
            }
        }
        res.json(response)
    })
})

app.post("/penyewaan", (req,res) => { 
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat, 
        nik: req.body.nik
    }

    // create sql query insert
    let sql = "insert into penyewa set ?"

    // run query
    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) 
    })
})

app.put("/penyewaan/:id_penyewa", (req,res) => {
    let data = [
        {
            nama: req.body.nama,
            alamat: req.body.alamat, 
            nik: req.body.nik
        },

        // parameter (primary key)
        {
            id_penyewa: req.body.id_penyewa
        }
    ]
    // create sql query update
    let sql = "update penyewa set ? where ?"

    // run query 
    db.query(sql, data, (error, result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        } else {
            response = {
            message: result.affectedRows + " data updated"
            }   
        }
        res.json(response) // send response
    })
})

app.delete("/penyewaan/:id_penyewa", (req, res) => {
    let data = {
        id_penyewa: req.params.id_penyewa
    }

    let sql = "delete from penyewa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if(error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

// ------------------------------ crud kendaraan ------------------------------ //

app.get("/kendaraan", (req,res) => {
    let sql = "select * from kendaraan" 

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                kendaraan: result
            }
        }
        res.json(response)
    })
})

app.get("/kendaraan/:id_kendaraan", (req, res) => {
    let data = {
        id_kendaraan: req.params.id_kendaraan
    }
    let sql = "select * from kendaraan where id_kendaraan"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }
        } else { 
            response = {
                count: result.length, 
                kendaraan: result 
            }
        }
        res.json(response)
    })
})

app.post("/kendaraan", (req,res) => { 
    let data = {
        nopol: req.body.nopol,
        warna: req.body.warna, 
        kondisi_kendaraan: req.body.kondisi_kendaraan
    }

    // create sql query insert
    let sql = "insert into kendaraan set ?"

    // run query
    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) 
    })
})

app.put("/kendaraan/:id_kendaraan", (req,res) => {
    let data = [
        {
            nopol: req.body.nopol,
            warna: req.body.warna, 
            kondisi_kendaraan: req.body.kondisi_kendaraan
        },

        // parameter (primary key)
        {
            id_kendaraan: req.body.id_kendaraan
        }
    ]
    // create sql query update
    let sql = "update kendaraan set ? where ?"

    // run query 
    db.query(sql, data, (error, result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        } else {
            response = {
            message: result.affectedRows + " data updated"
            }   
        }
        res.json(response) // send response
    })
})

app.delete("/kendaraan/:id_kendaraan", (req, res) => {
    let data = {
        id_kendaraan: req.params.id_kendaraan
    }

    let sql = "delete from kendaraan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if(error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

// ------------------------------ crud admin ------------------------------ //

app.get("/admin", (req,res) => {
    let sql = "select * from admin" 

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                admin: result
            }
        }
        res.json(response)
    })
})

app.get("/admin/:id_admin", (req, res) => {
    let data = {
        id_admin: req.params.id_admin
    }
    let sql = "select * from admin where id_admin"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }
        } else { 
            response = {
                count: result.length, 
                admin: result 
            }
        }
        res.json(response)
    })
})

app.post("/admin", (req,res) => { 
    let data = {
        nama_admin: req.body.nama_admin,
        status_admin: req.body.status_admin
    }

    // create sql query insert
    let sql = "insert into admin set ?"

    // run query
    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) 
    })
})

app.put("/admin/:id_admin", (req,res) => {
    let data = [
        {
            nama_admin: req.body.nama_admin,
            status_admin: req.body.status_admin
        },

        // parameter (primary key)
        {
            id_admin: req.body.id_admin
        }
    ]
    // create sql query update
    let sql = "update admin set ? where ?"

    // run query 
    db.query(sql, data, (error, result) => {
        let response = null
        if(error) {
            response = {
                message: error.message
            }
        } else {
            response = {
            message: result.affectedRows + " data updated"
            }   
        }
        res.json(response) // send response
    })
})

app.delete("/admin/:id_admin", (req, res) => {
    let data = {
        id_admin: req.params.id_admin
    }

    let sql = "delete from admin where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if(error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.listen(2000, () => {
    console.log("Run on port 2000")
})
