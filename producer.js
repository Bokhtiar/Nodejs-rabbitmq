const amqp = require('amqplib')

const rabbitSettings = {
    protocol : 'amqp',
    hostname : "localhost",
    port : 5672,
    username : 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
}

connect()

async function connect(){
    //name of queue
    const queue = "employee";
    const newQueue = "client";

    //test documents for queue 
    const msgs = [
        {"name": "guest1", "enterprice":"goodle"},
        {"name": "guest2", "enterprice":"facebook"},
        {"name": "guest3", "enterprice":"youtube"},
        {"name": "guest4", "enterprice":"gmail"},
        {"name": "guest5", "enterprice":"yeahoo"},
    ]

    try {
        //create connection
        const conn = await amqp.connect(rabbitSettings);
        console.log('connection create');

        //create channel
        const channel = await conn.createChannel();
        console.log('channel create');

        //queue
        let res = await channel.assertQueue(queue)
        console.log('queue create')


        // for(let msg in msgs){
        //     await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs[msg])));
        //     console.log("message send")
        // }
        await channel.sendToQueue(queue, Buffer.from(JSON.stringify({name:"mamun", "enterprice": "ridecare ltd"})))
        console.log('message send')

        //channel tow
        res = await channel.assertQueue(newQueue)
        console.log('queue create')

        for(let msg in msgs){
            await channel.sendToQueue(newQueue, Buffer.from(JSON.stringify(msgs[msg])));
            console.log("message send")
        }

    } catch (error) {
        console.log(error)
    }
}