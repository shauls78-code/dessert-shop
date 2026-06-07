import { useState } from 'react';
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

const DELIVERY_COST = 30;
const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=9720506793031";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);

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
    message += `משלוח (גוש דן): ₪${DELIVERY_COST}\n`;
    message += `סה"כ: ₪${total}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`${WHATSAPP_LINK}&text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="app">
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
          >
            🛒 עגלה ({cart.length})
          </button>
        </div>
      </header>

      <main className="main-content">
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
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <div className="cart-item-price">
                        <p>₪{item.price * item.quantity}</p>
                        <button 
                          className="remove-btn"
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
                    <span>משלוח (גוש דן):</span>
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
            <h2>קטלוג המוצרים</h2>
            <div className="vegan-notice">
              <p>🌱 <strong>אפשרות טבעונית:</strong> ניתן להתאים את רוב המוצרים לטבעונים. פרטים נוספים בהזמנה בווטסאפ.</p>
            </div>
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
                        onClick={() => addToCart(product)}
                      >
                        הוסף לעגלה
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="menu-card" onClick={openMenuModal}>
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
        <div className="modal-overlay" onClick={closeMenuModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeMenuModal}>✕</button>
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663365476934/aZxzMVwiMYyZpyrP.jpeg" alt="תפריט קינוחים" className="modal-image" />
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
            onClick={() => window.open(WHATSAPP_LINK, '_blank')}
          >
            💬 צור קשר בווטסאפ
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
