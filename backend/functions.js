const nodemailer = require("nodemailer");

const ankietaMultirowInsert = (rows, id_ankieta) => {
	rows = rows.map((row, index) => `(${id_ankieta}, $${index+1}, false)`);
	return rows.join();
};

async function sendMail(emails){
	newmail = emails.map((email) => `${email['mail']}`);
	console.log(newmail);
	let testAccount = await nodemailer.createTestAccount();
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
		  user: testAccount.user, // generated ethereal user
		  pass: testAccount.pass, // generated ethereal password
		},
	  });

	let info = await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: newmail, // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body
	  });

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
exports.ankietaMultirowInsert = ankietaMultirowInsert;
exports.sendMail = sendMail;