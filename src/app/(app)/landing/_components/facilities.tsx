import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Building2,
  Wrench,
  GraduationCap,
  User,
  Users,
  Building,
  FlaskConical,
  Laptop,
  Languages,
  BookOpen,
  DoorOpen,
  UserCheck,
  LucideIcon,
} from 'lucide-react';

type ColorType = 'red' | 'blue';

interface CategoryItem {
  name: string;
  icon: LucideIcon;
}

interface CategoryData {
  title: string;
  description: string;
  icon: LucideIcon;
  color: ColorType;
  items: CategoryItem[];
}

const categoriesData: CategoryData[] = [
  {
    title: 'Sarana',
    description: 'Bangunan dan ruangan sekolah',
    icon: Building2,
    color: 'red',
    items: [
      { name: 'Ruang Kelas', icon: GraduationCap },
      { name: 'Ruang Kepala Sekolah', icon: User },
      { name: 'Ruang Guru', icon: Users },
      { name: 'Aula Pertemuan', icon: Building },
      { name: 'Laboratorium IPA', icon: FlaskConical },
      { name: 'Laboratorium Komputer', icon: Laptop },
      { name: 'Laboratorium Bahasa', icon: Languages },
      { name: 'Perpustakaan', icon: BookOpen },
    ],
  },
  {
    title: 'Prasarana',
    description: 'Peralatan dan perlengkapan pembelajaran',
    icon: Wrench,
    color: 'blue',
    items: [
      { name: 'Meja dan Kursi Siswa', icon: GraduationCap },
      { name: 'Komputer', icon: Laptop },
      { name: 'Toilet Siswa', icon: DoorOpen },
      { name: 'Toilet Guru', icon: UserCheck },
      { name: 'Prasarana Lainnya', icon: Wrench },
    ],
  },
];

const Facilities: React.FC = () => {
  return (
    <>
      {/* Facilities Section */}
      <section id="facilities" className="py-20 bg-white">
        <div className="container mx-auto max-w-[1440px] px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Data yang Dikumpulkan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Sistem mengumpulkan data komprehensif untuk analisis prioritas
              kebutuhan
            </p>

            {/* Summary Stats */}
            <div className="flex justify-center items-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">8+</div>
                <div className="text-sm text-gray-600">Kategori Sarana</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5+</div>
                <div className="text-sm text-gray-600">Kategori Prasarana</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">3+</div>
                <div className="text-sm text-gray-600">Level Kondisi</div>
              </div>
            </div>
          </div>

          {/* Main Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categoriesData.map((category, index) => {
              const CategoryIcon = category.icon;
              const colorClasses: Record<
                ColorType,
                {
                  bg: string;
                  icon: string;
                  border: string;
                  item: string;
                }
              > = {
                red: {
                  bg: 'bg-red-50',
                  icon: 'bg-red-100 text-red-600',
                  border: 'border-red-200',
                  item: 'text-red-500',
                },
                blue: {
                  bg: 'bg-blue-50',
                  icon: 'bg-blue-100 text-blue-600',
                  border: 'border-blue-200',
                  item: 'text-blue-500',
                },
              };

              const currentColorClass = colorClasses[category.color];

              return (
                <Card
                  key={index}
                  className={`p-8 ${currentColorClass.bg} ${currentColorClass.border} border-2 hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl ${currentColorClass.icon} flex items-center justify-center mr-4`}
                    >
                      <CategoryIcon size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {category.title}
                      </h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map((item, itemIndex) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={itemIndex}
                          className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                          <ItemIcon
                            className={`${currentColorClass.item} mr-3`}
                            size={18}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Facilities;
