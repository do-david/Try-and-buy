const Email = require('../models/email.model');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const TAB_EMAIL = process.env.TAB_EMAIL;

exports.acceptedOffer = (req, res) => {
    console.log('Accept offer',req.body);
    const buyerName = req.body.buyerName;
    const buyerEmail = req.body.buyerEmail;
    const productTitle = req.body.productTitle;
    const email = new Email({
        to: buyerEmail,
        from: TAB_EMAIL,
        subject: 'Your proposal has been accepted',
        html: `<p>Dear ${buyerName},</p><p>We are pleased to inform you that you can now process to the paymnent for <strong>${productTitle}<strong/><p/><p>Best regards,</p><p>Try & Buy<p/>`,
        duration: 604800 // 1 semaine
    });
    console.log("Trying to send email",email);
    sgMail.send(email).then(() => {
        console.log('Email sent');
        email.save().catch(err=>console.log('error while trying to save email in bdd',err));
    })
    .catch((error) => {
        console.error(error)
    });

};

exports.sentProduct = (req, res) => {
    console.log('Sent product',req.body);
    const buyerName = req.body.buyerName;
    const buyerEmail = req.body.buyerEmail;
    const productTitle = req.body.productTitle;
    const email = new Email({
        to: buyerEmail,
        from: TAB_EMAIL,
        subject: 'Your product has been sent',
        html: `<p>Dear ${buyerName},</p><p>We are pleased to inform you that you can now <strong>${productTitle}<strong/>has been sent by the seller.<p/><p>Best regards,</p><p>Try & Buy<p/>`,
        duration: 604800 // 1 semaine
    });
    console.log("Trying to send email",email);
    sgMail.send(email).then(() => {
        console.log('Email sent');
        res.send(true);
        email.save().catch(err=>console.log('error while trying to save email in bdd',err));
    })
    .catch((error) => {
        console.error(error)
    });
};

exports.paidProduct = (req, res) => {
    console.log('Paid product',req.body);
    const sellerEmail = req.body.sellerEmail;
    const sellerName = req.body.sellerName;
    const productTitle = req.body.productTitle;
    const email = new Email({
        to: sellerEmail,
        from: TAB_EMAIL,
        subject: 'Your product has been paid',
        html: `<p>Dear ${sellerName},</p><p>We are pleased to inform you that you can now <strong>${productTitle}<strong/>has been paid by the buyer.<p/><p>Best regards,</p><p>Try & Buy<p/>`,
        duration: 604800 // 1 semaine
    });
    console.log("Trying to send email",email);
    sgMail.send(email).then(() => {
        console.log('Email sent');
        res.send(true);
        email.save().catch(err=>console.log('error while trying to save email in bdd',err));
    })
    .catch((error) => {
        console.error(error)
    });
};