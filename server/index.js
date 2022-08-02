//required dependancies
//express allows for quick creation of a server
const express=require ("express")
const app=express()
//cors allows for connection/interaction of different domains
const cors=require("cors")
//pg connects our database to our server
const pool=require("./db")

//middleware
//.use(cors()) to interact with the different domains
app.use(cors())
//.use(express.json()) to interact with the request.body module from the client side
app.use(express.json())


//routes
//create a todo
    app.post("/todos",async(req,res)=>{
        try {
            const {description}=req.body
            const newTodo= await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING * ",[description])
            res.json(newTodo.rows[0])
        } catch (error) {
            console.error(error.message)
        }
    })
//get all todos
    app.get("/todos", async (req,res)=>{
        try {
            const allTodos=await pool.query("SELECT * FROM todo")
            res.json(allTodos.rows)
        } catch (error) {
            console.error(error.message)
        }
    })

//get a todo
    app.get("/todos/:id", async (req,res)=>{
        try {
            const {id}=req.params
            const todo=await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id])
            res.json(todo.rows[0])
        } catch (error) {
            console.error(error.message)
        }
    })

//update a todo
    app.put("/todos/:id", async (req,res)=>{
        try {
            const {id}=req.params
            const {description}=req.body
            const updateTodo=await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id])
            res.json("todo was updated")
        } catch (error) {
            console.error(error.message)
        }
    })

//delete a todo
    app.delete("/todos/:id", async (req,res)=>{
        try {
            const {id}=req.params
            const deleteTodo=await pool.query("DELETE FROM todo WHERE todo_id=$1",[id])
            res.json("TODO WAS DELETED")
        } catch (error) {
            console.error(error.message)
        }
    })

//listening to the server port
app.listen(5000,()=>{
    console.log("server has started on port 5000")
})