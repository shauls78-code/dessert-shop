import { useEffect, useState } from 'react';
import './App.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  vegan?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "עוגת שוקולד עשירה",
    description: "אינגליש קייק",
    image: "https://files.cdn-files-a.com/uploads/9354289/800_681c453c94134.jpg?width=400",
    price: 45,
    unit: "יחידה"
  },
  {
    id: 2,
    name: "כדורי שוקולד",
    description: "מארז של 10 יחידות",
    image: "https://files.cdn-files-a.com/uploads/9354289/800_681c45abd7620.jpg?width=400",
    price: 55,
    unit: "10 יח'"
  },
  {
    id: 3,
    name: "כוסיות מוס שוקולד",
    description: "מארז של 10 יחידות",
    image: "https://files.cdn-files-a.com/uploads/9354289/800_681c453c937a2.jpg?width=400",
    price: 85,
    unit: "10 יח'"
  },
  {
    id: 4,
    name: "כוסיות מוס גבינה",
    description: "מארז של 10 יחידות",
    image: "https://files.cdn-files-a.com/uploads/9354289/800_681c453c937a2.jpg?width=400",
    price: 85,
    unit: "10 יח'"
  },
  {
    id: 5,
    name: "טארטים אישיים פקאן / שוקולד מריר",
    description: "מארז של 10 יחידות",
    image: "https://files.cdn-files-a.com/uploads/9354289/800_681c453c5423b.jpg?width=400",
    price: 100,
    unit: "10 יח'"
  },
  {
    id: 6,
    name: "עוגת ארטיק על מקל",
    description: "מארז של 10 יחידות",
    image: "https://files.cdn-files-a.com/uploads/9354289/800_681c453c7998e.jpg?width=400",
    price: 140,
    unit: "10 יח'"
  },
  {
    id: 7,
    name: "שוקופאי מטוגן",
    description: "מארז של 5 יחידות",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663365476934/vSnbkSwBDGwMKFKX.jpg",
    price: 58,
    unit: "5 יח'"
  },
  {
    id: 8,
    name: "שקדים מסוכרים",
    description: "500 גרם",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663365476934/WZBmpHGKWMLbbDpe.jpg",
    price: 60,
    unit: "500 גר'"
  },
  {
    id: 9,
    name: "4 פצצות תה",
    description: "הכירו את הדרך החדשה והמרגשת ליהנות מתה.\nכל פצצת תה היא כדור סוכר מנופח ועדין, שבתוכו מסתתרים פירות מיובשים וחליטות תה איכותיות. ברגע שמוזגים מים חמים, הכדור מתמוסס בהדרגה ומשחרר אל הכוס עולם של טעמים, צבעים וניחוחות.\nאת הפירות ניתן גם לאכול בתום השתיה .\n\nזו לא רק כוס תה – זו חוויה מרגיעה, מפנקת ומיוחדת שמתאימה לרגע של שקט, לאירוח או כמתנה מקורית למי שאוהבים.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663365476934/xcMYDOvYMnZGcIEW.png",
    price: 40,
    unit: "מארז"
  }
];

const packages: Product[] = [
  {
    id: 10,
    name: "מארז שולחן",
    description: "10 כוסיות מוס (שוקולד וגבינה), 10 כדורי שוקולד ועוגת שוקולד עשירה – מתאים לכ-8 אנשים",
    image: "https://files.cdn-files-a.com/uploads/9354289/800_681c453c94134.jpg?width=400",
    price: 195,
    unit: "מארז"
  },
  {
    id: 11,
    name: "זר שוקולד למתנה",
    description: "כ-20 כדורי שוקולד על שיפודים, ארוזים כמו זר פרחים – מתנה מתוקה ומרשימה",
    image: "/chocolate-bouquet.jpg",
    price: 139,
    unit: "זר"
  },
  {
    id: 12,
    name: "מארז טבעוני",
    description: "5 מאפיני שוקולד ו-10 כדורי שוקולד – אפשרות טבעונית מפנקת",
    image: "https://files.cdn-files-a.com/uploads/9354289/800_681c45abd7620.jpg?width=400",
    price: 115,
    unit: "מארז",
    vegan: true
  }
];

const DELIVERY_COST = 30;
const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=9720506793031";
type InfoModal = 'accessibility' | 'privacy' | 'terms' | null;

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [infoModal, setInfoModal] = useState<InfoModal>(null);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const goToHome = () => {
    setShowCart(false);
  };

  const openMenuModal = () => {
    setShowMenuModal(true);
  };

  const closeMenuModal = () => {
    setShowMenuModal(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMenuModal(false);
        setInfoModal(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + (cart.length > 0 ? DELIVERY_COST : 0);

  const sendToWhatsApp = () => {
    if (cart.length === 0) return;

    let message = "שלום, אני רוצה להזמין:\n\n";

    cart.forEach(item => {
      message += `${item.name} - ${item.quantity}x ${item.unit} = ₪${item.price * item.quantity}\n`;
    });

    message += `\nסכום ביניים: ₪${subtotal}\n`;
    message += `משלוח (תל אביב ורמת השרון): ₪${DELIVERY_COST}\n`;
    message += `סה"כ: ₪${total}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`${WHATSAPP_LINK}&text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">דלג לתוכן הראשי</a>
      <header className="header">
        <div className="header-content">
          <button
            className="logo-button"
            onClick={goToHome}
            title="חזור לעמוד הבית"
          >
            🍫 פיתויים קולינרים
          </button>
          <p>קינוחים איכותיים</p>
          <button
            className="cart-button"
            onClick={toggleCart}
            aria-label={`פתיחת עגלת הקניות, ${cart.length} מוצרים בעגלה`}
          >
            🛒 עגלה <span aria-live="polite">({cart.length})</span>
          </button>
        </div>
      </header>

      <main id="main-content" className="main-content" tabIndex={-1}>
        {showCart ? (
          <div className="cart-section">
            <h2>עגלת הקניות שלך</h2>
            {cart.length === 0 ? (
              <p className="empty-cart">העגלה ריקה</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{item.unit}</p>
                      </div>
                      <div className="cart-item-quantity">
                        <button aria-label={`הפחת כמות של ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button aria-label={`הוסף כמות של ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <div className="cart-item-price">
                        <p>₪{item.price * item.quantity}</p>
                        <button
                          className="remove-btn"
                          aria-label={`הסר את ${item.name} מהעגלה`}
                          onClick={() => removeFromCart(item.id)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>סכום ביניים:</span>
                    <span>₪{subtotal}</span>
                  </div>
                  <div className="summary-row">
                    <span>משלוח (תל אביב ורמת השרון):</span>
                    <span>₪{DELIVERY_COST}</span>
                  </div>
                  <div className="summary-row total">
                    <span>סה"כ:</span>
                    <span>₪{total}</span>
                  </div>
                </div>

                <button
                  className="whatsapp-button"
                  onClick={sendToWhatsApp}
                >
                  📱 שלח הזמנה לווטסאפ
                </button>

                <button
                  className="back-button"
                  onClick={goToHome}
                >
                  ← חזור לקטלוג
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="products-section">
            <h1 className="seo-heading">קינוחים איכותיים בתל אביב וברמת השרון</h1>
            <p className="seo-intro">מארזי קינוחים בעבודת יד, זר שוקולד, קינוחים אישיים ואפשרויות טבעוניות. משלוחים לתל אביב ולרמת השרון ואיסוף עצמי מתל אביב צפון.</p>
            <h2>קטלוג המוצרים</h2>
            <div className="vegan-notice">
              <p>🌱 <strong>אפשרות טבעונית:</strong> ניתן להתאים את רוב המוצרים לטבעונים. פרטים נוספים בהזמנה בווטסאפ.</p>
            </div>
            <div className="catalog-section">
              <h3 className="catalog-heading">הקינוחים שלנו</h3>
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      {product.vegan && <span className="vegan-badge">🌱 טבעוני</span>}
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <p className="product-unit">{product.unit}</p>
                      <div className="product-footer">
                        <span className="price">₪{product.price}</span>
                        <button
                          className="add-button"
                          aria-label={`הוסף לעגלה: ${product.name}, ${product.price} שקלים`}
                          onClick={() => addToCart(product)}
                        >
                          הוסף לעגלה
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <section className="packages-section" aria-labelledby="packages-heading">
              <div className="packages-header">
                <div>
                  <span className="packages-eyebrow">מהדורה מוגבלת</span>
                  <h3 id="packages-heading" className="catalog-heading">מארזי השבוע</h3>
                </div>
              </div>
              <div className="products-grid packages-grid">
                {packages.map(product => (
                  <div key={product.id} className="product-card package-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      {product.vegan && <span className="vegan-badge">🌱 טבעוני</span>}
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <p className="product-unit">{product.unit}</p>
                      <div className="product-footer">
                        <span className="price">₪{product.price}</span>
                        <button
                          className="add-button"
                          aria-label={`הוסף לעגלה: ${product.name}, ${product.price} שקלים`}
                          onClick={() => addToCart(product)}
                        >
                          הוסף לעגלה
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="products-grid">
              <div
                className="menu-card"
                role="button"
                tabIndex={0}
                aria-label="פתיחת תפריט קינוחים מלא"
                onClick={openMenuModal}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openMenuModal();
                  }
                }}
              >
                <div className="menu-image">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365476934/aZxzMVwiMYyZpyrP.jpeg" alt="תפריט קינוחים" />
                </div>
                <div className="menu-info">
                  <h3>תפריט קינוחים</h3>
                  <p>צפה בתפריט המלא עם כל המחירים</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showMenuModal && (
        <div className="modal-overlay" role="presentation" onClick={closeMenuModal}>
          <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="menu-modal-title" onClick={(e) => e.stopPropagation()}>
            <h2 id="menu-modal-title" className="visually-hidden">תפריט קינוחים מלא</h2>
            <button className="modal-close" aria-label="סגירת תפריט הקינוחים" onClick={closeMenuModal}>✕</button>
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365476934/aZxzMVwiMYyZpyrP.jpeg" alt="תפריט קינוחים" className="modal-image" />
          </div>
        </div>
      )}

      {infoModal && (
        <div className="modal-overlay" role="presentation" onClick={() => setInfoModal(null)}>
          <div className="info-modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="סגירת חלון המידע" onClick={() => setInfoModal(null)}>✕</button>
            {infoModal === 'accessibility' && (
              <>
                <h2 id="info-modal-title">הצהרת נגישות</h2>
                <p>פיתויים קולינרים פועל להנגשת האתר ולאפשר שימוש נוח ושוויוני לכלל הגולשים, בהתאם לעקרונות תקן ישראלי 5568 המבוסס על WCAG 2.0 ברמה AA.</p>
                <p>באתר הוטמעו, בין היתר, ניווט באמצעות מקלדת, קישור לדילוג לתוכן, מבנה כותרות, טקסט חלופי לתמונות, תוויות לכפתורים, ניגודיות מתאימה ותמיכה במסכים צרים.</p>
                <p>האתר לא עבר בשלב זה בדיקה מלאה על ידי מורשה נגישות או בדיקה מקיפה בכל טכנולוגיות העזר. אם נתקלתם בקושי, נשמח לקבל דיווח ולפעול לתיקון.</p>
                <p><strong>רכז/ת נגישות ופניות:</strong> שאול<br />טלפון: <a href="tel:0506793031">050-6793031</a><br />דוא״ל: <a href="mailto:shaul79@hotmail.com">shaul79@hotmail.com</a></p>
                <p>תאריך עדכון ההצהרה: 2 בנובמבר 2026.</p>
              </>
            )}
            {infoModal === 'privacy' && (
              <>
                <h2 id="info-modal-title">מדיניות פרטיות</h2>
                <p>האתר אינו דורש הרשמה ואינו שומר חשבון משתמש או פרטי אשראי. פרטי ההזמנה מועברים ל‑WhatsApp רק לאחר שהלקוח בוחר ללחוץ על כפתור שליחת ההזמנה.</p>
                <p>המשך השיחה והמידע שנשלח בה כפופים גם למדיניות הפרטיות של WhatsApp. אין להזין בהודעה מידע שאינו נחוץ לביצוע ההזמנה.</p>
                <p>פנייה בנושא פרטיות או בקשה למחיקת מידע שנמסר יש לשלוח ל‑<a href="mailto:shaul79@hotmail.com">shaul79@hotmail.com</a>. מדיניות זו אינה תחליף לבדיקה משפטית של חובות העסק לפי הדין החל.</p>
              </>
            )}
            {infoModal === 'terms' && (
              <>
                <h2 id="info-modal-title">תנאי הזמנה ומידע לצרכן</h2>
                <p>המחירים באתר מוצגים בשקלים. עלות משלוח היא 30 ₪, והמשלוחים מתבצעים לתל אביב ולרמת השרון. ניתן לבצע איסוף עצמי מתל אביב צפון.</p>
                <p>אמצעי התשלום: כרטיס אשראי, Bit ופייבוקס. ההזמנה אינה מאושרת עד לקבלת אישור מפורש ב‑WhatsApp מהעסק, ובו יימסרו מועד האספקה, זמינות המוצר וכל פרט נוסף הנדרש.</p>
                <p>מוצרי מזון עשויים להיות מתכלים או מיוצרים במיוחד. בקשות לביטול, שינוי או החזר יש להעביר בהקדם ב‑WhatsApp, והן יטופלו בהתאם לדין ולמאפייני המוצר או ההזמנה.</p>
                <p>לפני הזמנה יש לעדכן על אלרגיות או רגישויות. ניתן לבקש התאמה טבעונית ברוב המוצרים, בכפוף לאישור העסק.</p>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>📞 צור קשר: 0506793031</p>
            <p>📧 דוא"ל: shaul79@hotmail.com</p>
            <p>📍 משלוח: תל אביב ורמת השרון</p>
            <p>🚗 איסוף עצמי: תל אביב צפון</p>
            <p>💳 אנחנו מקבלים: כרטיס אשראי, ביט, פייבוקס</p>
          </div>
          <button
            className="footer-whatsapp-btn"
            aria-label="יצירת קשר עם פיתויים קולינרים בוואטסאפ"
            onClick={() => window.open(WHATSAPP_LINK, '_blank')}
          >
            💬 צור קשר בווטסאפ
          </button>
        </div>
        <nav className="footer-links" aria-label="מידע משפטי ונגישות">
          <button onClick={() => setInfoModal('accessibility')}>הצהרת נגישות</button>
          <button onClick={() => setInfoModal('privacy')}>מדיניות פרטיות</button>
          <button onClick={() => setInfoModal('terms')}>תנאי הזמנה</button>
        </nav>
      </footer>
    </div>
  );
}

export default App;
