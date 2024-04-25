

//-------------------------This page for element collection---------------------
//why am i make this??? because so this elements usable and efficient script

const elements = {
    id : {
        btnShopByCategory       : "gh-shop-a",
        inputSearch             : "gh-ac",
        categoryList             : "gh-cat",
    },

    xpath : {
        textContains            : "//*[contains(text(), '?')]",
        classContains           : "//*[contains(@class, '?')]",
        idContains              : "//*[contains(@id, '?')]",
        valContains              : "//*[contains(@value, '?')]",
        btnAllFilter            : "//*[contains(@class, 'brm__all-filters')]",
        checkBoxControl         : "//*[contains(@class, 'checkbox__control')]",
        radioLocation           : "//*[@name='location' and @value='?']",
        allFilter_btnApply      : "(//*[contains(@class, 'apply')]/button)[1]",
        itemPrice               : "//*[contains(@class, 'item__price')]/span",
        btnFilterApplies        : "(//*[contains(@class, 'x-flyout__button')])[1]",
        subFilterApplies        : "//*[contains(@class, 'brm__item-label') and contains(text(), '?')]",
    }
}

module.exports = elements;