
import fetch from 'node-fetch';

async function testWooCommerceSearch() {
  const siteUrl = 'https://admin.sacredsouls.in';
  const key = 'ck_d66a5e7159d90a89d7824872bb1fb5ec8b8c80c9';
  const secret = 'cs_b8a5f68213197c0e911e62a80a96849ec98ddb88';
  
  const searchTitle = 'Tree of Life';
  const url = `${siteUrl}/wp-json/wc/v3/products?search=${encodeURIComponent(searchTitle)}&consumer_key=${key}&consumer_secret=${secret}`;
  
  console.log(`Searching for: ${searchTitle}`);
  console.log(`URL: ${url}`);
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      const text = await res.text();
      console.error(text);
      return;
    }
    const data = await res.json();
    console.log(`Found ${data.length} products.`);
    if (data.length > 0) {
      const product = data[0];
      console.log(`Product found: ${product.name} (ID: ${product.id})`);
      console.log(`Meta Data:`, JSON.stringify(product.meta_data, null, 2));
    } else {
      console.log("No product found with this title.");
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testWooCommerceSearch();
