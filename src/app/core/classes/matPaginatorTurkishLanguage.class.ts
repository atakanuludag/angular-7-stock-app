import { MatPaginatorIntl } from '@angular/material';

export class MatPaginatorTurkishLanguage extends MatPaginatorIntl {
    itemsPerPageLabel = 'Sayfadaki ürün sayısı:';
    nextPageLabel = 'Sonraki Sayfa';
    previousPageLabel = 'Önceki Sayfa';

    getRangeLabel = function (page, pageSize, length) {
        if (length === 0 || pageSize === 0) {
            return '0 arası ' + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return startIndex + 1 + ' - ' + endIndex + ' arası ' + length;
    };

}
