const express = require('express')
const User = require('../models/UserModel')
const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        } 
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ fullName, email, password: hashedPassword })
        await user.save()
        res.status(201).json({ message: 'User created successfully', user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' }) 
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        req.session.userId = user._id
        req.session.fullName = user.fullName
        req.session.role = user.role
        res.status(200).json({ message: 'Login successful', user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('connect.sid');
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});


module.exports = router