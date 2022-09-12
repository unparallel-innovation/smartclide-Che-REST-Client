module.exports = {
    sort: function (results){
        return results.sort(function(a,b){
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
    },
    sortByUpdated: function (results){
        return results.sort(function(a,b){
            return b.attributes.updated - a.attributes.updated;
        });
    }
}
