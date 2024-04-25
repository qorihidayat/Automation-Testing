
# //-------------------------This page for skenario collection---------------------

Feature: Ebay
  Access a Product via category & Search

Scenario Outline: Access a Product via category after applying multiple filters
   Given go to ebay page
   When Navigate to Search by category > Electronics > Cell Phones & accessories
   Then click Cell Phones & smarthphone
   Then click all filter
   Then add filter "condition" = "<condition>",  "price" = "<min_price>" until "<max_price>", "location" = "<location>"
   Then click apply
   Then verify all filters applied

   Examples:
      | condition | min_price | max_price | location |
      | New       | 1000000   | 5000000   | Asia     |

Scenario: Access a Product via category after applying multiple filters
   Given go to ebay page
   When search according to keyword "Macbook"
   Then change category "Computers/Tablets & Networking"
   Then click search
   Then verify that the page loads completely
   Then verify that the first result name matches with the search string