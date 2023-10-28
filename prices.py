from bs4 import BeautifulSoup
import requests
import pandas as pd

url = "https://www.globalpetrolprices.com/electricity_prices/"

r = requests.get(url)
soup = BeautifulSoup(r.text, features="lxml")

# Extract prices and country
prices_elements = soup.find_all('div', {"id": "graphic"})
country_elements = soup.find_all('div', {"id": "outsideLinks"})

# Extract text and split based on newline characters to get individual items
prices = [price.strip() for p in prices_elements for price in p.get_text().split('\n') if price.strip()]
country = [c.strip() for c_elem in country_elements for c in c_elem.get_text().split('\n') if c.strip()]

# Ensure that prices and country lists are of the same length
min_length = min(len(prices), len(country))
prices = prices[:min_length]
country = country[:min_length]

# Create DataFrame
df = pd.DataFrame({
    'country': country,
    'Electricity Price': prices
})

custom_header = ['country', 'Electricity Price']
df.to_csv('output.csv', index=True, na_rep='N/A')
