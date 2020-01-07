
var generateWishlistHtml = function(wishlist) {
    var result = '<ul>';
    wishlist.forEach(function(wish) {
        result += `<li>${wish}</li>\n`;
    });
    result += '</ul>';
    return result;
};

var wishlist = [];

let form = document.getElementById('user-form');

form.addEventListener('submit', event => {
    event.preventDefault();

    let wish = form.elements['wish'];
    console.log(`wish.value: ${wish.value}`);

    let wishlistHtmlElement = document.getElementById('wishlistText');
    wishlist.push(wish.value);
    wishlistHtmlElement.innerHTML = generateWishlistHtml(wishlist);
});
