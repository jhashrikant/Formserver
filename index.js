const express = require('express')
const app = express()
const port = 5050;
const multer = require('multer');
const connectToMongoDb = require('./Database/db')
const User = require('./Models/User')

const cors = require('cors');
// ...
app.use(cors());


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.json());
connectToMongoDb()


app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`app listening on port${port}`)
});


app.post('/user', upload.single('file'), async (req, res) => {
    const { name, age, Gender, Interest } = req.body;
    console.log(Interest)
    console.log(name, age, Gender)
    let photo = null;

    if (req.file) {
       
    }

    try {
        const user = new User({
            name,
            age,
            Gender,
            Interest,
            photo,
        });

        await user.save();
        res.status(201).json({ message: 'Form submitted successfully!', res: true });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal Server Error', res: false });
    }
});


app.get('/getuser', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();
        // Send the array of users as the response
        res.status(200).json({ response: users, success: true });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, age, Gender, Interest, photo } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, {
            name,
            age,
            Gender,
            Interest,
            photo,
        }, { new: true });

        if (!user) {
            return res.status(404).json({ res: false, message: 'User not found' });
        }

        res.status(200).json({ res: true, message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ res: false, error: 'Internal Server Error' });
    }
});
