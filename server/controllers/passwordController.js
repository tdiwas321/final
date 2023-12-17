const express = require('express');
const router = express.Router();
const user = require('../models/user');

router.post('/change/:id', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.params.id;

        const users = await user.findById(userId);
        if (users.password !== currentPassword) {
            return res.status(400).json({ error: 'Invalid current password' });
        }

        users.password = newPassword;
        await users.save();

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

)

module.exports = router;