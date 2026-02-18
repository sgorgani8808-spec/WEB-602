const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'statsdb';
const client = new MongoClient(url);

// --------------------
// Task 1
// --------------------
async function task1_createDatabase() {
  try {
    await client.connect();
    console.log('Connected Successfully');

    client.db(dbName);
    console.log('Database statsdb created');
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

// task1_createDatabase();


// --------------------
// Task 2
// --------------------
async function task2_createCollection() {
  try {
    await client.connect();
    console.log('Connected Successfully');

    const db = client.db(dbName);
    await db.createCollection('uscensus');
    console.log('Collection uscensus created');
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

// task2_createCollection();


// --------------------
// Task 3
// --------------------
async function task3_insertData() {
  try {
    await client.connect();
    console.log('Connected Successfully');

    const collection = client.db(dbName).collection('uscensus');

    const stats = [
      { city: 'San Juan', zip: '00926', state: 'PR', income: 34781, age: 44 },
      { city: 'Corona', zip: '11368', state: 'NY', income: 50797, age: 32 },
      { city: 'Chicago', zip: '60629', state: 'IL', income: 42019, age: 31 },
      { city: 'El Paso', zip: '79936', state: 'TX', income: 54692, age: 31 },
      { city: 'Los Angeles', zip: '90011', state: 'CA', income: 36954, age: 28 },
      { city: 'Norwalk', zip: '90650', state: 'CA', income: 66453, age: 35 }
    ];

    const result = await collection.insertMany(stats);
    console.log(result.insertedCount + ' documents inserted');
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

// task3_insertData();


// --------------------
// Task 4
// --------------------
async function task4_addRecords() {
  try {
    await client.connect();
    console.log('Connected Successfully');

    const collection = client.db(dbName).collection('uscensus');

    const records = [
      { city: 'Pacoima', zip: '91331', state: 'CA', income: 60360, age: 33 },
      { city: 'Ketchikan', zip: '99950', state: 'AK', income: 0, age: 0 }
    ];

    const result = await collection.insertMany(records);
    console.log(result.insertedCount + ' documents inserted');
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
// task4_addRecords();

// --------------------
// Task 5
// --------------------
async function task5_findZipForCoronaNY() {
  try {
    await client.connect();
    console.log('Connected Successfully');

    const collection = client.db(dbName).collection('uscensus');

    const result = await collection.findOne(
      { city: 'Corona', state: 'NY' },
      { projection: { zip: 1, _id: 0 } }
    );

    console.log('Zip code for Corona, NY is:', result.zip);

  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
// task5_findZipForCoronaNY();

// --------------------
// Task 6
// --------------------
async function task6_findIncomeForCalifornia() {
  try {
    await client.connect();
    console.log('Connected Successfully');

    const collection = client.db(dbName).collection('uscensus');

    const results = await collection
      .find({ state: 'CA' }, { projection: { city: 1, income: 1, _id: 0 } })
      .toArray();

    console.log('Income for cities in California:');
    console.log(results);

  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
// task6_findIncomeForCalifornia();

// --------------------
// Task 7
// --------------------

async function task7_updateAlaska() {
  try {
    await client.connect();
    console.log('Connected Successfully');

    const collection = client.db(dbName).collection('uscensus');

    const query = { state: 'AK' };
    const newValues = {
      $set: {
        income: 38910,
        age: 46
      }
    };

    const result = await collection.updateOne(query, newValues);

    console.log(result.modifiedCount + ' document updated');

  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
// task7_updateAlaska();

// --------------------
// Task 8
// --------------------
async function task8_sortByState() {
  try {
    await client.connect();
    console.log('Connected Successfully');

    const collection = client.db(dbName).collection('uscensus');

    const sortQuery = { state: 1 };

    const results = await collection
      .find({})
      .sort(sortQuery)
      .toArray();

    console.log('Sorted records by state (ascending):');
    console.log(results);

  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
task8_sortByState();
