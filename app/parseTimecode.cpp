#include <string>
#include <iostream>
#include <fstream>
#include "parseTimecode.h"

InfoVideo::InfoVideo(char * fileName)
{
  _fileName=fileName;
  _delay=0;
  _frameRate = 0;
}

void saveData(InfoVideo * g,InfoVideo * r,InfoVideo * l, int fnbd)
{
  std::string data;
  std::ofstream file;
  file.open("public/data.xml");
  data = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<current_observation>\n";
  data += "<videoName>" + g->getName() + "</videoName>\n";
  data += "<duration_g>" + g->getDuration() + "</duration_g>\n";
  data += "<timecode_g>" + g->getTimeCode() + "</timecode_g>\n";
  data += "<frameRate_g>" + std::to_string(g->getFrameRate()) + "</frameRate_g>\n";

  data += "<duration_r>" + r->getDuration() + "</duration_r>\n";
  data += "<timecode_r>" + r->getTimeCode() + "</timecode_r>\n";
  data += "<frameRate_r>" + std::to_string(r->getFrameRate()) + "</frameRate_r>\n";

  data += "<duration_l>" + l->getDuration() + "</duration_l>\n";
  data += "<timecode_l>" + l->getTimeCode() + "</timecode_l>\n";
  data += "<frameRate_l>" + std::to_string(l->getFrameRate()) + "</frameRate_l>\n";
  data += "<delayRL>" + std::to_string(fnbd) + "</delayRL>\n";
  data += "</current_observation>";

  file << data;
  file.close();
}



void InfoVideo::parse(std::string name)
{
  std::ifstream file(this->_fileName);
  if (!file)
  {
    std::cerr << "file not open" << '\n';
    return;
  }

  std::string lines;
  std::string t;
  t.reserve(11);
  std::string d;
  d.reserve(11);
  std::string fr;
  fr.reserve(5);
  while (file) {
    file >> lines;
    if (lines == "timecode")
    {
      file >> t;
      file >> t;
    }
    if (lines == "Duration:")
    {
      file >> d;
      d.pop_back();
    }
    if (lines == "kb/s,")
    {
      file >> fr;
    }
  }
  file.close();
  _videoName = name;
  _timecode = t;
  _frameRate = std::stof(fr);
  _duration = d;
}

int main(int argc, char * argv[])
{
  if (argc < 3)
  {
    std::cerr << "Usage : ./parser <R video file> <L video file> <G video file> <G video file" << '\n';
    return -1;
  }
  std::string name = argv[4];
  int posBegin = 0;
  while (1)
      {
        int test = name.find('/',posBegin);
        if (test == -1)
          break;
        else
          posBegin = test+1;
      }
  int posEnd = name.find('.',1);
  name = name.substr(posBegin,posEnd-posBegin);

  InfoVideo gVideo(argv[3]);
  InfoVideo rVideo(argv[1]);
  InfoVideo lVideo(argv[2]);

  gVideo.parse(name);
  rVideo.parse(name);
  lVideo.parse(name);

  int hr,hl,mr,ml,sr,sl,fr,fl;
  if (rVideo.getTimeCode().size() != 0 && lVideo.getTimeCode().size() != 0)
  {
      hr = std::stoi(rVideo.getTimeCode().substr(0,2));
      hl = std::stoi(lVideo.getTimeCode().substr(0,2));
      mr = std::stoi(rVideo.getTimeCode().substr(3,5));
      ml = std::stoi(lVideo.getTimeCode().substr(3,5));
      sr = std::stoi(rVideo.getTimeCode().substr(6,8));
      sl = std::stoi(lVideo.getTimeCode().substr(6,8));
      fr = std::stoi(rVideo.getTimeCode().substr(9,11));
      fl = std::stoi(lVideo.getTimeCode().substr(9,11));
  }
  float f1;
  f1 = fl/lVideo.getFrameRate() - fr/rVideo.getFrameRate();
  int timeDiff = (sr + mr*60 + hr*60*60) - (sl + ml*60 + hl*60*60);
  int frameNbdiff = (sr + mr*60 + hr*60*60)*rVideo.getFrameRate() + fr - ((sl + ml*60 + hl*60*60)*lVideo.getFrameRate() + fl);
  float delay = timeDiff + f1;

  saveData(&gVideo,&rVideo,&lVideo,frameNbdiff);

  if (delay < 0)
    rVideo.setDelay(-delay);
  else
    lVideo.setDelay(delay);

  return delay*100;
}
