const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const Employee = require("./Model/Employee");
const empAuth=require("./Model/Login")

mongoose
  .connect("mongodb://0.0.0.0:27017/employeeDB")
  .then(() => console.log("mongodb connection successful"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.post("/create", (req, res) => {
  console.log("req.body", req.body);
  Employee.create(req.body)
    .then((employee) => {
      console.log("Employee", employee);
      return res.json(employee);
    })
    .catch((err) => {
      console.error("Error creating employee:", err);
      return res.status(500).json({ error: "An error occurred while creating employee." });
    });
});

app.get("/", (req, res) => {
  Employee.find()
    .then((employees) => {
      console.log("Employees", employees);
      return res.json(employees);
    })
    .catch((err) => {
      console.error("Error fetching employees:", err);
      return res.status(500).json({ error: "An error occurred while fetching employees." });
    });
});
app.post("/registration", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill in all fields" });
  }

  try {
    const userExist = await empAuth.findOne({ email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }

    const user = new empAuth({ name, email, password });
    await user.save();
    generateAuthToken(  )
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  const user = await empAuth.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});




app.put("/updateuser/:id", (req, res) => {
  const id = req.params.id;
  Employee.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      position: req.body.position,
      department: req.body.department,
      salary: req.body.salary,
    },
    { new: true }
  )
    .then((employee) => {
      if (!employee) {
        return res.status(400).json({ error: "Message: Employee not found" });
      }
      return res.json(employee);
    })
    .catch((err) => {
      console.error("Error updating employee:", err);
      return res.status(500).json({ error: "An error occurred while updating employee." });
    }); 
});

app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  Employee.findByIdAndDelete(id)
    .then(() => {
      return res.json({ message: "Deletion successful" });
    })
    .catch((err) => {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "An error occurred while deleting employee." });
    });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
