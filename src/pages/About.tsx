import React from 'react';
import { Award, Users, Clock, Target, MapPin, Phone } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About SVS Digitals</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your trusted local printing partner in Shaikpet, Hyderabad. 
              We bring creativity and quality together for all your printing needs.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                SVS Digitals was established with a vision to provide high-quality printing and 
                digital services to the community of Hyderabad. Located in the heart of Shaikpet, 
                we have been serving customers with dedication and excellence.
              </p>
              <p className="text-gray-600 mb-4">
                From humble beginnings, we have grown to become a trusted name in the printing 
                industry, specializing in everything from business cards to wedding invitations, 
                photo prints to custom promotional items.
              </p>
              <p className="text-gray-600">
                Our commitment to quality, personalized service, and competitive pricing has 
                made us the preferred choice for individuals and businesses alike.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/6802045/pexels-photo-6802045.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="SVS Digitals workspace"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide our work and define our commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-gray-600">
                We use premium materials and advanced printing technology to ensure superior results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                Every customer is important to us, and we provide personalized attention to each project.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Timely Delivery</h3>
              <p className="text-gray-600">
                We understand deadlines matter and ensure prompt delivery without compromising quality.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We stay updated with latest printing technologies and design trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Business Solutions</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Business Cards</li>
                <li>• Letter Pads</li>
                <li>• Brochures</li>
                <li>• Bill Books</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-green-600">Personal & Events</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Wedding Cards</li>
                <li>• Photo Prints</li>
                <li>• Event Invitations</li>
                <li>• Photo Albums</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Custom Products</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• T-Shirt Printing</li>
                <li>• Custom Mugs</li>
                <li>• Keychains & Badges</li>
                <li>• Promotional Items</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Shop</h2>
            <p className="text-gray-600">
              Conveniently located in Shaikpet, Hyderabad for easy access
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-gray-100 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p className="text-gray-600">Colony Lanco Hills Road<br />Shaikpet, Hyderabad</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-gray-600">97000 00451</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center p-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.1029929185443!2d78.3905094!3d17.4068443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96b0240410eb%3A0x7939ddc4b9ed2c6d!2sSVS%20ID%20CARDS!5e0!3m2!1sen!2sin!4v1751460451027!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '0.5rem', minWidth: '200px', height: '100%' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SVS Digitals Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}