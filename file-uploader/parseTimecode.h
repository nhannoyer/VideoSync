#ifndef PARSER_H
#define PARSER_H
#include <string>

class InfoVideo
{
public:
  InfoVideo(char * fileName);
  void parse();
  float getDelay() {return _delay;}
  void setDelay(float delay){_delay=delay;}
  float getFrameRate(){return _frameRate;}
  std::string getTimeCode(){return _timecode;}
  std::string getDuration(){return _duration;}
  std::string getName(){return _videoName;}


private:
  char * _fileName;
  float _delay;
  std::string _videoName;
  std::string _timecode;
  std::string _duration;
  float _frameRate;

};



#endif
