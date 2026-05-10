# הוראות העלאה לשרת קבוע

## אפשרות 1: Vercel (מומלצת - הכי קלה)

1. עבור ל: https://vercel.com
2. התחבר עם GitHub / Google
3. לחץ "Add New Project"
4. בחר את הריפו של האתר
5. Vercel יעלה את האתר אוטומטית
6. תקבל דומיין קבוע כמו: `dessert-shop.vercel.app`

## אפשרות 2: Netlify

1. עבור ל: https://netlify.com
2. התחבר עם GitHub / Google
3. לחץ "Add new site"
4. בחר את הריפו של האתר
5. Netlify יעלה את האתר אוטומטית
6. תקבל דומיין קבוע כמו: `dessert-shop.netlify.app`

## אפשרות 3: GitHub Pages

1. עבור ל: https://github.com/new
2. צור ריפו חדש בשם: `dessert-shop`
3. דחוף את הקוד:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/dessert-shop.git
   git branch -M main
   git push -u origin main
   ```
4. עבור ל: Settings > Pages
5. בחר "Deploy from a branch"
6. בחר: `main` ו-`/dist` folder
7. תקבל דומיין קבוע כמו: `YOUR_USERNAME.github.io/dessert-shop`

## הערות חשובות

- האתר מוכן לפריסה - כל קובץ נמצא בתיקייה `dist/`
- לא צריך להתקין תלויות - הכל כבר מוכן
- האתר יהיה תמיד און ליין ולא ירדם
