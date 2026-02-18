const { MongoClient } = require('mongodb');

// ==============================
// CONNECTION SETUP
// ==============================
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'nodemongo';
const client = new MongoClient(url);

async function runDemo() {
  try {
    // ==============================
    // CONNECT
    // ==============================
    await client.connect();
    console.log('Connected Successfully');

    const db = client.db(dbName);
    const collection = db.collection('customers');

    // ==============================
    // RESET COLLECTION (SAFE FOR DEMO)
    // ==============================
    await collection.deleteMany({});
    console.log('Collection reset');

    // ==============================
    // INSERT MANY DOCUMENTS
    // ==============================
    const custData = [
      { name: 'John', address: 'Highway 71' },
      { name: 'Peter', address: 'Lowstreet 4' },
      { name: 'Amy', address: 'Apple st 652' },
      { name: 'Hannah', address: 'Mountain 21' },
      { name: 'Michael', address: 'Valley 345' },
      { name: 'Sandy', address: 'Ocean blvd 2' },
      { name: 'Betty', address: 'Green Grass 1' },
      { name: 'Richard', address: 'Sky st 331' },
      { name: 'Susan', address: 'One way 98' },
      { name: 'Vicky', address: 'Yellow Garden 2' },
      { name: 'Ben', address: 'Park Lane 38' },
      { name: 'William', address: 'Central st 954' },
      { name: 'Chuck', address: 'Main Road 989' },
      { name: 'Viola', address: 'Sideway 1633' }
    ];

    const insertResult = await collection.insertMany(custData);
    console.log(`Number of documents inserted: ${insertResult.insertedCount}`);

    // ==============================
    // FIND ONE
    // ==============================
    const oneCustomer = await collection.findOne({});
    console.log('FindOne result:', oneCustomer.name);

    // ==============================
    // FIND WITH QUERY
    // ==============================
    const query = { address: 'Park Lane 38' };
    const foundItems = await collection.find(query).toArray();
    console.log(`Successfully found ${foundItems.length} document(s)`);
    console.log(foundItems);

    // ==============================
    // SORT RESULTS
    // ==============================
    const sortedItems = await collection
      .find()
      .sort({ name: 1 })
      .toArray();

    console.log(`Successfully sorted ${sortedItems.length} documents`);
    console.log(sortedItems);

    // ==============================
    // UPDATE ONE DOCUMENT
    // ==============================
    const updateQuery = { address: 'Valley 345' };
    const newValues = { $set: { name: 'Mickey', address: 'Canyon 123' } };

    const updateResult = await collection.updateOne(updateQuery, newValues);
    console.log(`${updateResult.modifiedCount} document updated`);

    // ==============================
    // DELETE ONE DOCUMENT
    // ==============================
    const deleteQuery = { address: 'Mountain 21' };
    const deleteResult = await collection.deleteOne(deleteQuery);
    console.log(`${deleteResult.deletedCount} document deleted`);

  } catch (error) {
    console.log('Failed to connect', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

runDemo();
