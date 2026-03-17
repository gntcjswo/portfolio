//<![CDATA[
/** 아이템을 등록한다. */
function submitItem() {
    if(!validateItem()) {
    	return;
    }
    alert("등록");
}

/** 아이템 체크 */
function validateItem() {
    var items = $("input[type='text'][name='item']");
    if(items.length == 0) {
        alert("작성된 아이템이 없습니다.");
        return false;
    }

    var flag = true;
    for(var i = 0; i < items.length; i++) {
        if($(items.get(i)).val().trim() == "") {
            flag = false;
            alert("내용을 입력하지 않은 항목이 있습니다.");
            break;
        }
    }

    return flag;
}

/** UI 설정 */
$(function() {
    $("#itemBoxWrap").sortable({
        placeholder:"itemBoxHighlight",
        start: function(event, ui) {
            ui.item.data('start_pos', ui.item.index());
        },
        stop: function(event, ui) {
            var spos = ui.item.data('start_pos');
            var epos = ui.item.index();
			      reorder();
        }
    });
    //$("#itemBoxWrap").disableSelection();
});

/** 아이템 순서 조정 */
function reorder() {
    $(".itemBox").each(function(i, box) {
        $(box).find(".itemNum").html(i + 1);
    });
}

/** 아이템 추가 */
function createItem() {
    $(createBox())
    .appendTo("#itemBoxWrap")
//    .hover(
//        function() {
//            $(this).css('backgroundColor', '#f9f9f5');
//            $(this).find('.deleteBox').show();
//        },
//        function() {
//            $(this).css('background', 'none');
//            $(this).find('.deleteBox').hide();
//        }
//    )
		.append("<div class='deleteBox'><img src='/assets/img/ic_title_message_delete.png' alt='삭제' /></div>")
		.find(".deleteBox").on('click', function() {
        var valueCheck = false;
        $(this).parent().find('input').each(function() {
            if($(this).attr("name") != "type" && $(this).val() != '') {
                valueCheck = true;
            }
        });

        if(valueCheck) {
            var delCheck = confirm('입력하신 내용이 있습니다.\n삭제하시겠습니까?');
        }
        if(!valueCheck || delCheck == true) {
            $(this).parent().remove();
            reorder();
        }
    });
    // 숫자를 다시 붙인다.
    reorder();
}

/** 아이템 박스 작성 */
function createBox() {
    var contents = "<div class='itemBox'>"
                 + "<div class='itemBox__inner'>"
                 + "<span class='itemNum'></span> "
                 + "<input class='bor_b_focus' type='text' name='item' placeholder='항목 입력' />"
                 + "</div>"
                 + "</div>";
    return contents;
}
//]]>