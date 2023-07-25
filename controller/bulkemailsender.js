
const nodemailer = require("nodemailer");



async function bulkmail(req, res) {
  try {
    const { messagefrom, messageto, appPassword, subject, message,username} = req.body
    console.log(req.body)
    const { option } = req.query;
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: messagefrom, // enter your email address
        pass: appPassword  // enter your 16digit password
      }
    });
    const emails = messageto.split(",");

    function template(a) {
      switch (a) {
        case "1": return `<body style="background-color:grey">
            <table align="center" border="0" cellpadding="0" cellspacing="0"
                   width="550" bgcolor="white" style="border:2px solid black">
                <tbody>
                    <tr>
                        <td align="center">
                            <table align="center" border="0" cellpadding="0"
                                   cellspacing="0" class="col-550" width="550">
                                <tbody>
                                    <tr>
                                        <td align="center" style="background-color: #4cb96b;
                                                   height: 50px;">
           
                                            <a href="#" style="text-decoration: none;">
                                                <p style="color:white;
                                                          font-weight:bold;">
                                                   FREE BULK EMAIL SERVICES
                                                </p>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr style="height: 300px;">
                        <td align="center" style="border: none;
                                   border-bottom: 2px solid #4cb96b; 
                                   padding-right: 20px;padding-left:20px">
           
                            <p style="font-weight: bolder;font-size: 18px;
                                      letter-spacing: 0.025em;
                                      color:black;">
                               ${message}
                            </p>
                        </td>
                    </tr>
                    <tr>
                      <td align="left">                       
<pre style="color:black;font-weight:small;>                       ">
Thank you,
with regards
${username}</pre> </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                  </tr>      
                </tbody>
            </table>
          </body>`;
        default: return `${message}`;
      }
    }

    const html = template(option);
    var mailOptions = {
      from: messagefrom,
      to: emails,
      subject: subject,
      html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email was sent successfully: ' + info.response);
      }
    });
    res.status(200).json('Send Mail with nodejs');

  }
  catch (error) {
    console.log(error)
  }
}

module.exports = { bulkmail }

