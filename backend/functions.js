const nodemailer = require("nodemailer");

const ankietaMultirowInsert = (rows, id_ankieta) => {
	rows = rows.map((row, index) => `(${id_ankieta}, $${index+1}, false)`);
	return rows.join();
};


function betterResult(id_prof1, score1, id_prof2, score2 ){	
	if(score1 > score2){
		return id_prof1;
	} else if(score2 > score1){
		return id_prof2;
	}else{
		return 0;
	}
}
function chooseBetterProf(id_prof1, allResults1, id_prof2, allResults2){
	sum1 = 0;
	sum2 = 0

	for(i =0; i <allResults1.length; ++i){
		sum1 += parseInt(allResults1[i])
		sum2 += parseInt(allResults2[i])
	}

	if(sum1 > sum2){
		return id_prof1;
	} else if(sum2 > sum1){
		return id_prof2;
	}else{
		return 0;
	}
 
}


async function sendMail(emails){
	newmail = emails.map((email) => `${email['mail']}`);
	console.log(newmail);
	let testAccount = await nodemailer.createTestAccount();
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
		  user: 'agcha.ankiety@gmail.com', // generated ethereal user
		  pass: '!23QweAsd', // generated ethereal password
		},
	  });
	  message = "<b>Cześć,</b><br>Nowa ankieta została przygotowana dla Ciebie do wypełnienia.<br>";
	  message += "Aby ją wypłnić zaloguj się do swojego konta na adres: <a href='http://ec2-3-95-32-80.compute-1.amazonaws.com:3000/student/login/'>link</a> używając nr PESEL oraz nr indeksu.";
	let info = await transporter.sendMail({
		from: 'agcha.ankiety@gmail.com', // sender address
		to: newmail, // list of receivers
		subject: "Nowa ankieta do wypełnienia", // Subject line
		html: message, // html body
	  });

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
exports.ankietaMultirowInsert = ankietaMultirowInsert;
exports.betterResult = betterResult;
exports.sendMail = sendMail;
exports.chooseBetterProf = chooseBetterProf