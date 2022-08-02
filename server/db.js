const Pool=require("pg").Pool

const pool=new Pool({
    user:"postgres",
    password:"HARRISONmuema4219",
    host:"localhost",
    port:5432,
    database:"perntodo"
})

module.exports=pool