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
    const enterprice = "google";
 

    try {
        //create connection
        const conn = await amqp.connect(rabbitSettings);
        console.log('connection create');

        //create channel
        const channel = await conn.createChannel();
        console.log('channel create');

        //queue
        const res = await channel.assertQueue(queue)
        console.log('queue create')

        console.log(`waiting for message from ${enterprice}`);
        channel.consume(queue, message =>{
            
            let employee = JSON.parse(message.content.toString());
            console.log(employee.name)
            console.log(`Recive message ${employee.name}`);
            console.log(employee);
        })

    } catch (error) {
        console.log(error)
    }
}