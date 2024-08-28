import express from 'express';
import kafka from 'kafka-node';

// Crie uma instância do cliente Kafka
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const producer = new kafka.Producer(client);
const consumer = new kafka.Consumer(
  client,
  [{ topic: 'test-topic', partition: 0 }],
  { autoCommit: true }
);

// Quando o produtor estiver pronto
producer.on('ready', () => {
  console.log('Kafka Producer is connected and ready.');

  // Envie uma mensagem para o tópico
  producer.send(
    [{ topic: 'test-topic', messages: 'Hello Kafka!' }],
    (err, data) => {
      if (err) {
        console.error('Failed to send message:', err);
      } else {
        console.log('Message sent successfully:', data);
      }
    }
  );
});

producer.on('error', (err) => {
  console.error('Error in Kafka Producer:', err);
});

// Receba mensagens do consumidor
consumer.on('message', (message) => {
  console.log('Received message:', message);
});

consumer.on('error', (err) => {
  console.error('Error in Kafka Consumer:', err);
});

const app = express();

const port = 3001;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
