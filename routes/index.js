var express = require('express');
var router = express.Router();
const userSchema = require('./users');


const nodemailer = require('nodemailer');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/subscribe', async (req, res) => {
    const email = req.body.email;
    // Render email template with dynamic data
    const html = `<!-- views/confirmationEmail.hbs -->
    <div>
        <h1>Welcome to Our Newsletter!</h1>
        <p>Thank you for subscribing to our newsletter. We're excited to have you on board!</p>
        <p>Here's a little information about our company:</p>
        <p>With these steps, you have set up Express with Handlebars as the template engine. Now you can create dynamic views using Handlebars templates and render them in your Express routes.</p>
        <img src="https://images.unsplash.com/photo-1710188801399-f37fed6d7c58?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D" alt="Company Logo" style="max-width: 100%; height: auto;">
        <p>For any questions or inquiries, feel free to contact us at <a href="mailto:parsonda61@gmail.com">parsonda61@gmail.com</a>.</p>
    </div>`;

    try {
        // Check if the email address already exists in the database
        const existingSubscription = await userSchema.findOne({ email });
        if (existingSubscription) {
            return res.status(400).json({ message: 'Email address already subscribed.' });
        }
        // Store email address in the database
        const newSubscription = new userSchema({ email: email });
        await newSubscription.save();

        // Send a confirmation email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'parsonda61@gmail.com',
                pass: 'webw mqhm elwp lzjs'
            }
        });

        const mailOptions = {
            from: 'parsonda61@gmail.com',
            to: email,
            subject: 'Confirmation Email',
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

        res.json({ message: 'Subscription successful! Check your email for confirmation.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred while saving subscription.' });
    }
});





module.exports = router;
