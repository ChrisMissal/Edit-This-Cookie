jQuery(document).ready(function(){
    $("input:checkbox").uniform();
    setAdsOption();
    setEvents();
    setDonation();
});

updateCallback = function() {
    setAdsOption();
};

function setAdsOption() {
    $(':checkbox').removeAttr('checked');
    
    $("#donationsMadeDetails").hide();
    
    $("#AN_showADSStatus").prop('checked', AN_status.showADS);
    if(AN_status.showADS) {
    	$("#donation_heart").show();
    	$("#donation_heart_broken").hide();
    	$(".charityMessage").removeClass("benefit-unmatched");
    	$("#unicefImage").css("opacity","1");
	} else {
		$("#donation_heart").hide();
		$("#donation_heart_broken").show();
		$(".charityMessage").addClass("benefit-unmatched");
		$("#unicefImage").css("opacity","0.5");
    }
    $.uniform.update();
}

function setEvents() {
    $("#AN_showADSStatus").click(function() {
        AN_status.showADS = $('#AN_showADSStatus').prop("checked");
        setAdsOption();
    });
	$("#donationsMadeTitle").click(function() {
		$("#donationsMadeDetails").toggle("slide", {"direction": "left"});
	});
	$(".linkify").click(function(){
		var urlToOpen = $(this).attr("lnk");
		if(urlToOpen == undefined)
			return;
		
		chrome.tabs.getCurrent(function(cTab){
			chrome.tabs.create({
				"url" : urlToOpen,
				"active": true,
				"index": cTab.index + 1,
				"openerTabId": cTab.id
			});
		});
	});
}

function setDonation() {
    var slider = $("#paypal-slider").slider({
        animate: false,
        value: 10,
        min: 1,
        max: 60,
        step: 1,
        slide: function( event, ui ) {
            $( "#amount-show" ).html( ui.value );
            setDonationMessage(ui.value);
        },
        create: function(event, ui) {
            $( "#amount-show" ).html(10);
            setDonationMessage(10);
        }
    });
	
    $( "#paypal-donate-button" ).button();
    $( "#paypal-donate-button" ).click(function() {
        $("#paypal-form-amount").removeAttr("disabled");
        submitPayPalForm();
    });
	
    $("#paypal-custom-amount").click(function() {
        $("#paypal-form-amount").attr("disabled","disabled");
        submitPayPalForm();
    });
}

function submitPayPalForm() {
    var lang = "US";
    if(/IT/i.test(window.navigator.language))
        lang = "IT";
    else if(/ES/i.test(window.navigator.language))
        lang = "ES";
    //$("#paypal-form-lang").val(lang);
    var amount = $("#paypal-slider").slider("value");
    $("#paypal-form-amount").val(amount);
    var currency = $("#paypal-currency-selector").val();
    $("#paypal-form-currency").val(currency);
    $("#paypal-form").submit();
}

function setDonationMessage(amount) {
    var benefitItems = $("#benefits-list > li")
    $("#benefits-list > li").addClass("benefit-unmatched");
	
    if(amount >= 1)
        $(benefitItems.get(0)).removeClass("benefit-unmatched");
    else
        return;
    if(amount >= 5)
        $(benefitItems.get(1)).removeClass("benefit-unmatched");
    else
        return;
    if(amount >= 10)
        $(benefitItems.get(2)).removeClass("benefit-unmatched");
    else
        return;
    if(amount >= 15)
        $(benefitItems.get(3)).removeClass("benefit-unmatched");
    else
        return;
    if(amount >= 20)
        $(benefitItems.get(4)).removeClass("benefit-unmatched");
    else
        return;
    if(amount >= 30)
        $(benefitItems.get(5)).removeClass("benefit-unmatched");
    else
        return;
    if(amount >= 35)
        $(benefitItems.get(6)).removeClass("benefit-unmatched");
    else
        return;
    if(amount >= 40)
        $(benefitItems.get(7)).removeClass("benefit-unmatched");
    else
        return;
    if(amount >= 50 )
        $(benefitItems.get(8)).removeClass("benefit-unmatched");
    else
        return;
}
