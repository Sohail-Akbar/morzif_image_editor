tc.fn.cb.mdlUpdateTemplate = ($mdl, e) => {
    $mdl = $($mdl);
    let $btn = $(e.relatedTarget),
        credits = $btn.parents("tr").find(".credit-td").dataVal("value"),
        $addCreditBtn = $mdl.find(`.add-new-credit-btn`);
    if (!isJson(credits)) credits = []
    else credits = JSON.parse(credits);

    // Fill data
    let $itemsCon = $addCreditBtn.addHTML("getDrop");
    $itemsCon.html('');
    credits.forEach(item => {
        $addCreditBtn.trigger("click");
        let $item = $itemsCon.children().last();

        $item.find(`[name="credits[position][]"]`).val(item.position);
        $item.find(`[name="credits[text][]"]`).val(item.text);
    });
}