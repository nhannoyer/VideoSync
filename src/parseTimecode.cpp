#include <string>
#include <iostream>
 #include <fstream>

int main(int argc, char * argv[])
{
  std::ifstream file(argv[1]);
  if (!file)
  {
    std::cerr << "file not open" << '\n';
    return -1;
  }

  std::string lines;
  std::string t1;
  t1.reserve(11);
  std::string d1;
  d1.reserve(11);
  std::string fr1;
  fr1.reserve(5);
  while (file) {
    file >> lines;
    if (lines == "timecode")
    {
      file >> t1;
      file >> t1;
    }
    if (lines == "Duration:")
    {
      file >> d1;
      d1.pop_back();
    }
    if (lines == "kb/s,")
    {
      file >> fr1;
    }
  }
  file.close();

  std::ifstream file2(argv[2]);
  if (!file2)
  {
    std::cerr << "file not open" << '\n';
    return -1;
  }

  std::string t2;
  t2.reserve(11);
  std::string d2;
  d2.reserve(11);
  std::string fr2;
  fr2.reserve(5);

  while (file2) {
    file2 >> lines;
    if (lines== "timecode")
    {
      file2 >> t2;
      file2 >> t2;
    }
    if (lines == "Duration:")
    {
      file2 >> d2;
      d2.pop_back();
    }
    if (lines == "kb/s,")
    {
      file2 >> fr2;
    }
  }
  file2.close();

  int h1,m1,s1,f1,h2,m2,s2,f2;
  std::cout << t1 << "," << t2 << '\n';
  if (t1.size() != 0 && t2.size() != 0)
  {
      h1 = std::stoi(t1.substr(0,2)) - std::stoi(t2.substr(0,2));
      m1 = std::stoi(t1.substr(3,5)) - std::stoi(t2.substr(3,5));
      s1 = std::stoi(t1.substr(6,8)) - std::stoi(t2.substr(6,8));
      f1 = std::stoi(t2.substr(9,11)) - std::stoi(t1.substr(9,11));

//      std::cout << h1 << "," << m1 << "," << s1 << "," << f1 << '\n';
  }

  if (d1.size() != 0 && d2.size() != 0)
  {
      h2 = std::stoi(d1.substr(0,2)) - std::stoi(d2.substr(0,2));
      m2 = std::stoi(d1.substr(3,5)) - std::stoi(d2.substr(3,5));
      s2 = std::stoi(d1.substr(6,8)) - std::stoi(d2.substr(6,8));
      f2 = std::stoi(d1.substr(9,11)) -  std::stoi(d2.substr(9,11));

//      std::cout << h2 << "," << m2 << "," << s2 << "," << f2 << '\n';
  }
  float delay = (s1-s2) + (m1 - m2)*60 + (h1 - h2)*60*60 + (f1/std::stof(fr1)-f2/std::stof(fr2));
  return delay*100;
}
