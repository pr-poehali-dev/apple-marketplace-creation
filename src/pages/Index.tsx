import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  condition: 'Новый' | 'Б/У';
  city: string;
  image: string;
  storage?: string;
  color?: string;
}

const categories = [
  { name: 'iPhone', icon: 'Smartphone' },
  { name: 'iPad', icon: 'Tablet' },
  { name: 'MacBook', icon: 'Laptop' },
  { name: 'iMac', icon: 'Monitor' },
  { name: 'Apple Watch', icon: 'Watch' },
  { name: 'AirPods', icon: 'Headphones' },
];

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max',
    price: 125000,
    category: 'iPhone',
    condition: 'Новый',
    city: 'Москва',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
    storage: '256GB',
    color: 'Titanium'
  },
  {
    id: 2,
    title: 'MacBook Pro 14" M3',
    price: 189000,
    category: 'MacBook',
    condition: 'Новый',
    city: 'Санкт-Петербург',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    storage: '512GB',
    color: 'Space Black'
  },
  {
    id: 3,
    title: 'iPad Pro 12.9"',
    price: 98000,
    category: 'iPad',
    condition: 'Б/У',
    city: 'Москва',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    storage: '128GB',
    color: 'Silver'
  },
  {
    id: 4,
    title: 'Apple Watch Ultra 2',
    price: 82000,
    category: 'Apple Watch',
    condition: 'Новый',
    city: 'Казань',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500',
    color: 'Titanium'
  },
  {
    id: 5,
    title: 'AirPods Pro 2',
    price: 22000,
    category: 'AirPods',
    condition: 'Новый',
    city: 'Екатеринбург',
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
    color: 'White'
  },
  {
    id: 6,
    title: 'iMac 24" M3',
    price: 165000,
    category: 'iMac',
    condition: 'Новый',
    city: 'Новосибирск',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
    storage: '256GB',
    color: 'Blue'
  },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Apple" size={24} className="text-background" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Яблочная азбука
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" size="sm">
                <Icon name="Heart" size={18} className="mr-2" />
                Избранное
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="MessageSquare" size={18} className="mr-2" />
                Сообщения
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-secondary hover:bg-secondary/90">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Разместить объявление
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Новое объявление</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-6 mt-4">
                    <div className="space-y-2">
                      <Label>Категория</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.name} value={cat.name}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Название</Label>
                      <Input placeholder="iPhone 15 Pro Max 256GB" />
                    </div>

                    <div className="space-y-2">
                      <Label>Описание</Label>
                      <Textarea 
                        placeholder="Подробное описание товара..."
                        rows={5}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Цена (₽)</Label>
                        <Input type="number" placeholder="125000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Состояние</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">Новый</SelectItem>
                            <SelectItem value="used">Б/У</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Город</Label>
                      <Input placeholder="Москва" />
                    </div>

                    <div className="space-y-2">
                      <Label>Фотографии</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Нажмите или перетащите файлы
                        </p>
                      </div>
                    </div>

                    <Button className="w-full bg-secondary hover:bg-secondary/90" size="lg">
                      <Icon name="Check" size={18} className="mr-2" />
                      Опубликовать объявление
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Маркетплейс техники Apple
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Покупайте и продавайте оригинальную технику Apple
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по объявлениям..."
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-xl font-semibold mb-6">Категории</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )}
                className={`group p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Icon 
                  name={category.icon as any} 
                  size={32} 
                  className={`mx-auto mb-3 transition-colors ${
                    selectedCategory === category.name
                      ? 'text-primary'
                      : 'text-muted-foreground group-hover:text-primary'
                  }`}
                />
                <p className={`font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'text-primary'
                    : 'text-foreground'
                }`}>
                  {category.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {selectedCategory ? `${selectedCategory}` : 'Все объявления'}
            <span className="text-muted-foreground ml-2">
              ({filteredProducts.length})
            </span>
          </h3>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              <Icon name="X" size={16} className="mr-1" />
              Сбросить фильтр
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group cursor-pointer overflow-hidden border-border hover:border-primary/50 transition-all hover:scale-[1.02] animate-scale-in"
              style={{ animationDelay: `${0.05 * index}s` }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant={product.condition === 'Новый' ? 'default' : 'secondary'}
                    className={product.condition === 'Новый' ? 'bg-secondary' : ''}
                  >
                    {product.condition}
                  </Badge>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <Icon name="Heart" size={20} />
                  </button>
                </div>
                <h4 className="font-semibold text-lg mb-1 line-clamp-1">
                  {product.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Icon name="MapPin" size={14} />
                  <span>{product.city}</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {product.price.toLocaleString('ru-RU')} ₽
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProduct.title}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-4xl font-bold text-primary mb-2">
                      {selectedProduct.price.toLocaleString('ru-RU')} ₽
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-secondary">
                        {selectedProduct.condition}
                      </Badge>
                      <Badge variant="outline">{selectedProduct.category}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Характеристики</h4>
                    <div className="space-y-2">
                      {selectedProduct.storage && (
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">Память</span>
                          <span className="font-medium">{selectedProduct.storage}</span>
                        </div>
                      )}
                      {selectedProduct.color && (
                        <div className="flex justify-between py-2 border-b border-border">
                          <span className="text-muted-foreground">Цвет</span>
                          <span className="font-medium">{selectedProduct.color}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Город</span>
                        <span className="font-medium">{selectedProduct.city}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-secondary hover:bg-secondary/90" size="lg">
                      <Icon name="Phone" size={18} className="mr-2" />
                      Показать телефон
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Icon name="MessageCircle" size={18} className="mr-2" />
                      Написать сообщение
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Icon name="User" size={20} className="text-background" />
                      </div>
                      <div>
                        <p className="font-medium">Продавец</p>
                        <p className="text-sm text-muted-foreground">На сайте с 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t border-border mt-20 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Apple" size={16} className="text-background" />
                </div>
                <h3 className="font-bold">Яблочная азбука</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Маркетплейс оригинальной техники Apple
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Как покупать</li>
                <li>Безопасная сделка</li>
                <li>Гарантии</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Продавцам</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Как продавать</li>
                <li>Платные услуги</li>
                <li>Правила</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Помощь</li>
                <li>Контакты</li>
                <li>О сервисе</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 Яблочная азбука. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}