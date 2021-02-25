# FC Integrated With Slack Demo 

This demo introduces a simple solution to integrate Slack with Function Compute, using Slack Command to  invoke function, and then function response into a richly formatted Slack message.

## Objectives

* Create a Slash Command in Slack.
* Prepare the environment and Deploy function.
* Using the Slash Command to invoke function.

## Step1: Create a Slack App
- Create a Slack App to host your Slack Slash Command, See [Create a Slack App](https://api.slack.com/apps)

## Step2: Prepare the environment
Install [Funcraft](https://help.aliyun.com/document_detail/140283.html?spm=a2c4g.11186623.6.820.6a034e21y2jlx1) on the local machine. For more information, see installation instructions.
  - Run `fun --version` to check whether the installation is successful.
  - You need to configure funcraft with your own aliyun access key id and access key secret. Follow the steps in Configure Funcraft .Run fun config to configure Funcraft. Then configure Account ID, Access Key ID, Access Key Secret, and Default region name as prompted.

```
$ fun config
Aliyun Account ID 1234xxx
Aliyun Access Key ID xxxx
Aliyun Access Key Secret xxxx
Default region name cn-xxxx
The timeout in seconds for each SDK client invoking 300
The maximum number of retries for each SDK client 5
Allow to anonynously report usage statistics to improve the tool over time? (Y/n)
```

## Step3: Deploy function
Replace SLACK_SECRET in template.yml with the signing secret provided by Slack in the Basic information page of your app configuration.
```
fun build  # build the demo
fun deploy -y # deploy function
```

## Step4: Create a Slash Command
When function is deployed successfully, a url will be provided. Eg: this demo's custom domain `https://1221968287646227.cn-zhangjiakou.fc.aliyuncs.com/2016-08-15/proxy/slack-test/func/`

- Create a Slash Command, See [Slack Slash Command](https://api.slack.com/interactivity/slash-commands).

Enter the URL of function as Request URL for the command.

## Step5: invoke function 
Using the Slash command

- Type the command into your Slack channel:
```
/invoke 
```
- The Slack API can receive response from function:
  
![](https://fc-test-zhang-jun.oss-cn-shanghai.aliyuncs.com/slack-demo.png)  
