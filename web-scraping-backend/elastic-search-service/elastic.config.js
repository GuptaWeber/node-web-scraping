const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "https://localhost:9200/",
  auth: {
    apiKey: "cFRkT0twQUJVOU5QeWIxUlROeWI6emRFbEU1SmNRbkdNZU5GZElmeWJGQQ==",
  },
});
const data = require("../scrape/data.json");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function setupElasticSearch(index) {
  try {
    const resp = await client.info();
    console.log(resp);

    //delete the index if it exists
    try {
      const deleteIndex = await client.indices.delete({
        index,
      });
      console.log(deleteIndex);
    } catch (error) {
      console.log("Index does not exist");
    }

    //create the index
    try {
      const createIndex = await client.indices.create({
        index,
      });
      console.log(createIndex);
    } catch (error) {
      if (error.message.includes("resource_already_exists_exception")) {
        console.log("Index already exists");
      }
    }

    //Insert the data

    const body = data.flatMap((doc) => [{ index: { _index: index } }, doc]);

    const { body: bulkResponse } = await client.bulk({ refresh: true, body });

    if (bulkResponse?.errors) {
      console.log("Failed to index data");
    }
    console.log(bulkResponse);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function queryElasticSearch(index, searchTerm) {
  try {
    const queryBody = {
      query: {
        bool: {
          should: [
            {
              wildcard: {
                companyName: {
                  value: `*${searchTerm}*`,
                },
              },
            },
            {
              wildcard: {
                cin: {
                  value: `*${searchTerm}*`,
                },
              },
            },
            {
              wildcard: {
                email: {
                  value: `*${searchTerm}*`,
                },
              },
            },
          ],
        },
      },
    };

    const body = await client.search({
      index,
      body: queryBody,
    });

    return body.hits.hits;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteElasticDocument(index, id) {
  try {
    const { body } = await client.delete({
      index,
      id,
    });

    return true;
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = {
  setupElasticSearch,
  queryElasticSearch,
  deleteElasticDocument,
};
