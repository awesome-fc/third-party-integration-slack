let rawBody = require('raw-body');
let { verifyRequestSignature } = require('@slack/events-api');

let getRawBody = async (req) => {
  return new Promise((resolve, reject) => {
    rawBody(req, function (err, body) {
      if (err) {
        return reject(err)
      }
      return resolve(body.toString())
    });
  });
}

let verifySignature = async (req) => {
  let body = await getRawBody(req)
  let signature = {
    signingSecret: process.env.SLACK_SECRET,
    requestSignature: req.headers['x-slack-signature'],
    requestTimestamp: req.headers['x-slack-request-timestamp'],
    body: body,
  };

  try {
    verifyRequestSignature(signature)
    return Promise.resolve(true);
  } catch (err) {
    console.log("Slack events-api verify request signature err:", err)
    return Promise.reject(new Error('Invalid credentials'));
  }
}

let createSlackMessage = () => {
  let attachment = {
    color: '#3367d6',
    title: "fc msg",
    text: "hello alibaba fc"
  };

  let slackMessage = {
    response_type: 'in_channel',
    text: `hello fc`,
    attachments: [attachment],
  };

  return JSON.stringify(slackMessage)
}

exports.handler = async (req, resp, context) => {
  try {
    if (req.method !== 'POST') {
      let err = new Error('Request method invalid');
      throw err;
    }

    // Verify slack signature
    await verifySignature(req)

    // Slack message
    let msg = createSlackMessage()
    resp.setHeader("Content-Type", "application/json");
    resp.send(msg);
  } catch (err) {
    console.log("handler err:", err)
    resp.send(err);
  }
}