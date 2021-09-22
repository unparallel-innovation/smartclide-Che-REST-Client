module.exports = {
    sort: function (results){
        return results.sort(function(a,b){
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    }

}
