FasdUAS 1.101.10   ��   ��    k             l      ��  ��   *********************************************************

ADOBE SYSTEMS INCORPORATED 
Copyright 2005-2010 Adobe Systems Incorporated 
All Rights Reserved 

NOTICE:  Adobe permits you to use, modify, and 
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.  
If you have received this file from a source 
other than Adobe, then your use, modification,
or distribution of it requires the prior 
written permission of Adobe. 

********************************************************     � 	 	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 
 A D O B E   S Y S T E M S   I N C O R P O R A T E D   
 C o p y r i g h t   2 0 0 5 - 2 0 1 0   A d o b e   S y s t e m s   I n c o r p o r a t e d   
 A l l   R i g h t s   R e s e r v e d   
 
 N O T I C E :     A d o b e   p e r m i t s   y o u   t o   u s e ,   m o d i f y ,   a n d   
 d i s t r i b u t e   t h i s   f i l e   i n   a c c o r d a n c e   w i t h   t h e   t e r m s 
 o f   t h e   A d o b e   l i c e n s e   a g r e e m e n t   a c c o m p a n y i n g   i t .     
 I f   y o u   h a v e   r e c e i v e d   t h i s   f i l e   f r o m   a   s o u r c e   
 o t h e r   t h a n   A d o b e ,   t h e n   y o u r   u s e ,   m o d i f i c a t i o n , 
 o r   d i s t r i b u t i o n   o f   i t   r e q u i r e s   t h e   p r i o r   
 w r i t t e n   p e r m i s s i o n   o f   A d o b e .   
 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   
  
 l     ����  O         k           I   	������
�� .miscactvnull��� ��� obj ��  ��     ��  r   
     I  
 ���� 
�� .sysostdfalis    ��� null��    �� ��
�� 
prmp  m       �   L L o c a t e   t h e   f i l e :   ' C a l e n d a r T e m p l a t e . a i '��    o      ���� 0 
myfilepath 
myFilePath��    m       �                                                                                  MACS  alis    r  Macintosh HD               ��+H+     j
Finder.app                                                       �ǰ�        ����  	                CoreServices    ��      ǰ�       j   &   %  3Macintosh HD:System:Library:CoreServices:Finder.app    
 F i n d e r . a p p    M a c i n t o s h   H D  &System/Library/CoreServices/Finder.app  / ��  ��  ��        l     ��������  ��  ��        l     ��  ��      Now create the calendar     �     0   N o w   c r e a t e   t h e   c a l e n d a r   ! " ! l   #���� # O    $ % $ k    & &  ' ( ' I   ������
�� .miscactvnull��� ��� obj ��  ��   (  ) * ) I   $�� +��
�� .aevtodocnull  �    alis + o     ���� 0 
myfilepath 
myFilePath��   *  , - , l  % %��������  ��  ��   -  . / . l   % %�� 0 1��   0��
	 Get references to the two text boxes.
	 (Note: Getting the text boxes using a whose construct is not very efficient,
	  but for a small sample like this, it'll do.
	  It would be more efficient to first name the text items
	  (for example "MonthTextItem" and "DayTextItem")
	  You can then access the items by name, like:
	     set MonthTextItem to text frame "MonthTextItem" of document 1
	  To name an item you can write a script such as:
	     set name of text frame 1 of document 1 to "MonthTextItem")

	 Secondly, note the Template.ai document is locked. This is a good practice
	 when you work with templates because it prevents a script from accidentally overwriting the
	 template document.
	    1 � 2 2~ 
 	   G e t   r e f e r e n c e s   t o   t h e   t w o   t e x t   b o x e s . 
 	   ( N o t e :   G e t t i n g   t h e   t e x t   b o x e s   u s i n g   a   w h o s e   c o n s t r u c t   i s   n o t   v e r y   e f f i c i e n t , 
 	     b u t   f o r   a   s m a l l   s a m p l e   l i k e   t h i s ,   i t ' l l   d o . 
 	     I t   w o u l d   b e   m o r e   e f f i c i e n t   t o   f i r s t   n a m e   t h e   t e x t   i t e m s 
 	     ( f o r   e x a m p l e   " M o n t h T e x t I t e m "   a n d   " D a y T e x t I t e m " ) 
 	     Y o u   c a n   t h e n   a c c e s s   t h e   i t e m s   b y   n a m e ,   l i k e : 
 	           s e t   M o n t h T e x t I t e m   t o   t e x t   f r a m e   " M o n t h T e x t I t e m "   o f   d o c u m e n t   1 
 	     T o   n a m e   a n   i t e m   y o u   c a n   w r i t e   a   s c r i p t   s u c h   a s : 
 	           s e t   n a m e   o f   t e x t   f r a m e   1   o f   d o c u m e n t   1   t o   " M o n t h T e x t I t e m " ) 
 
 	   S e c o n d l y ,   n o t e   t h e   T e m p l a t e . a i   d o c u m e n t   i s   l o c k e d .   T h i s   i s   a   g o o d   p r a c t i c e 
 	   w h e n   y o u   w o r k   w i t h   t e m p l a t e s   b e c a u s e   i t   p r e v e n t s   a   s c r i p t   f r o m   a c c i d e n t a l l y   o v e r w r i t i n g   t h e 
 	   t e m p l a t e   d o c u m e n t . 
 	 /  3 4 3 l  % %��������  ��  ��   4  5 6 5 r   % 9 7 8 7 c   % 7 9 : 9 l  % 5 ;���� ; 6  % 5 < = < n   % , > ? > 4  ) ,�� @
�� 
cTXa @ m   * +����  ? 4   % )�� A
�� 
docu A m   ' (����  = =  - 4 B C B 1   . 0��
�� 
pCNT C m   1 3 D D � E E 
 # N a m e��  ��   : m   5 6��
�� 
obj  8 o      ���� 0 monthtextitem MonthTextItem 6  F G F r   : P H I H c   : L J K J l  : J L���� L 6  : J M N M n   : A O P O 4  > A�� Q
�� 
cTXa Q m   ? @����  P 4   : >�� R
�� 
docu R m   < =����  N =  B I S T S 1   C E��
�� 
pCNT T m   F H U U � V V 
 # D a y s��  ��   K m   J K��
�� 
obj  I o      ���� 0 daytextitem DayTextItem G  W X W l  Q Q��������  ��  ��   X  Y Z Y l  Q Q�� [ \��   [ @ : Now generate the contents of the text area with the days.    \ � ] ] t   N o w   g e n e r a t e   t h e   c o n t e n t s   o f   t h e   t e x t   a r e a   w i t h   t h e   d a y s . Z  ^ _ ^ r   Q X ` a ` m   Q T b b � c c  J a n u a r y a o      ���� 0 mymonth myMonth _  d e d l  Y Y��������  ��  ��   e  f g f r   Y b h i h l  Y ^ j���� j I  Y ^������
�� .misccurdldt    ��� null��  ��  ��  ��   i o      ���� 	0 today   g  k l k r   c n m n m n   c j o p o m   f j��
�� 
mnth p o   c f���� 	0 today   n o      ���� 0 mymonth myMonth l  q r q l  o o��������  ��  ��   r  s t s l  o o�� u v��   u O I Calculate the different day possibilities the different months can have.    v � w w �   C a l c u l a t e   t h e   d i f f e r e n t   d a y   p o s s i b i l i t i e s   t h e   d i f f e r e n t   m o n t h s   c a n   h a v e . t  x y x r   o v z { z m   o r | | � } }   { o      ���� 0 	monthdays 	monthDays y  ~  ~ Y   w � ��� � ��� � k   � � � �  � � � r   � � � � � [   � � � � � ]   � � � � � l  � � ����� � \   � � � � � o   � ����� 0 i   � m   � ����� ��  ��   � m   � �����  � m   � �����  � o      ���� 0 d   �  ��� � r   � � � � � b   � � � � � b   � � � � � b   � � � � � b   � � � � � b   � � � � � b   � � � � � b   � � � � � b   � � � � � b   � � � � � b   � � � � � b   � � � � � b   � � � � � b   � � � � � b   � � � � � o   � ����� 0 	monthdays 	monthDays � o   � ����� 0 d   � 1   � ���
�� 
tab  � l  � � ����� � [   � � � � � o   � ����� 0 d   � m   � ����� ��  ��   � 1   � ���
�� 
tab  � l  � � ����� � [   � � � � � o   � ����� 0 d   � m   � ����� ��  ��   � 1   � ���
�� 
tab  � l  � � ����� � [   � � � � � o   � ����� 0 d   � m   � ����� ��  ��   � 1   � ���
�� 
tab  � l  � � ����� � [   � � � � � o   � ����� 0 d   � m   � ����� ��  ��   � 1   � ���
�� 
tab  � l  � � ����� � [   � � � � � o   � ����� 0 d   � m   � ����� ��  ��   � 1   � ���
�� 
tab  � l  � � ����� � [   � � � � � o   � ����� 0 d   � m   � ����� ��  ��   � o   � ���
�� 
ret  � o      ���� 0 	monthdays 	monthDays��  �� 0 i   � m   z {����  � m   { ~���� ��     � � � l  � ���������  ��  ��   �  � � � r   � � � � � o   � ����� 0 	monthdays 	monthDays � o      ���� 0 month28days Month28Days �  � � � r   � � � � b   � � � � � b   � � � � � b   � � � � � o   � ����� 0 month28days Month28Days � m   � � � � � � �  2 9 � 1   � ���
�� 
tab  � m   � � � � � � �  3 0 � o      ���� 0 month30days Month30Days �  � � � r   � � � b   � � � b   � � � o  ���� 0 month30days Month30Days � 1  
��
�� 
tab  � m   � � � � �  3 1 � o      �� 0 month31days Month31Days �  � � � l �~�}�|�~  �}  �|   �  � � � Z   � � � � � l  ��{�z � =  � � � o  �y�y 0 mymonth myMonth � m  �x
�x 
jan �{  �z   � r  % � � � o  !�w�w 0 month31days Month31Days � o      �v�v 0 mydays myDays �  � � � l (/ ��u�t � = (/ � � � o  (+�s�s 0 mymonth myMonth � m  +.�r
�r 
feb �u  �t   �  � � � r  29 � � � o  25�q�q 0 month28days Month28Days � o      �p�p 0 mydays myDays �  � � � l <C ��o�n � = <C � � � o  <?�m�m 0 mymonth myMonth � m  ?B�l
�l 
mar �o  �n   �  � � � r  FM � � � o  FI�k�k 0 month31days Month31Days � o      �j�j 0 mydays myDays �  � � � l PW ��i�h � = PW   o  PS�g�g 0 mymonth myMonth m  SV�f
�f 
apr �i  �h   �  r  Za o  Z]�e�e 0 month30days Month30Days o      �d�d 0 mydays myDays  l dk�c�b = dk	
	 o  dg�a�a 0 mymonth myMonth
 m  gj�`
�` 
may �c  �b    r  nu o  nq�_�_ 0 month31days Month31Days o      �^�^ 0 mydays myDays  l x�]�\ = x o  x{�[�[ 0 mymonth myMonth m  {~�Z
�Z 
jun �]  �\    r  �� o  ���Y�Y 0 month30days Month30Days o      �X�X 0 mydays myDays  l ���W�V = �� o  ���U�U 0 mymonth myMonth m  ���T
�T 
jul �W  �V    r  ��  o  ���S�S 0 month31days Month31Days  o      �R�R 0 mydays myDays !"! l ��#�Q�P# = ��$%$ o  ���O�O 0 mymonth myMonth% m  ���N
�N 
aug �Q  �P  " &'& r  ��()( o  ���M�M 0 month31days Month31Days) o      �L�L 0 mydays myDays' *+* l ��,�K�J, = ��-.- o  ���I�I 0 mymonth myMonth. m  ���H
�H 
sep �K  �J  + /0/ r  ��121 o  ���G�G 0 month30days Month30Days2 o      �F�F 0 mydays myDays0 343 l ��5�E�D5 = ��676 o  ���C�C 0 mymonth myMonth7 m  ���B
�B 
oct �E  �D  4 898 r  ��:;: o  ���A�A 0 month31days Month31Days; o      �@�@ 0 mydays myDays9 <=< l ��>�?�>> = ��?@? o  ���=�= 0 mymonth myMonth@ m  ���<
�< 
nov �?  �>  = ABA r  ��CDC o  ���;�; 0 month30days Month30DaysD o      �:�: 0 mydays myDaysB EFE l ��G�9�8G = ��HIH o  ���7�7 0 mymonth myMonthI m  ���6
�6 
dec �9  �8  F J�5J r  �KLK o  ���4�4 0 month31days Month31DaysL o      �3�3 0 mydays myDays�5   � k  MM NON I �2P�1
�2 .sysodlogaskr        TEXTP m  QQ �RR  U n k n o w n   M o n t h�1  O S�0S L  �/�/  �0   � TUT l �.�-�,�.  �-  �,  U VWV r  NXYX b  JZ[Z b  F\]\ b  B^_^ b  >`a` b  :bcb b  6ded b  2fgf b  .hih b  *jkj b  &lml b  "non b  pqp b  rsr b  tut m  vv �ww  Mu 1  �+
�+ 
tab s m  xx �yy  Tq 1  �*
�* 
tab o m  !zz �{{  Wm 1  "%�)
�) 
tab k m  &)|| �}}  Ti 1  *-�(
�( 
tab g m  .1~~ �  Fe 1  25�'
�' 
tab c m  69�� ���  Sa 1  :=�&
�& 
tab _ m  >A�� ���  S] o  BE�%
�% 
ret [ o  FI�$�$ 0 mydays myDaysY o      �#�# 0 mydays myDaysW ��� l OO�"�!� �"  �!  �   � ��� l OO����  � 0 * Now insert the text into the illustration   � ��� T   N o w   i n s e r t   t h e   t e x t   i n t o   t h e   i l l u s t r a t i o n� ��� l OO����  � S M either use:   set contents of contents of MonthTextItem to (myMonth as text)   � ��� �   e i t h e r   u s e :       s e t   c o n t e n t s   o f   c o n t e n t s   o f   M o n t h T e x t I t e m   t o   ( m y M o n t h   a s   t e x t )� ��� l OO����  � O I or the shorter version:   set text of MonthTextItem to (myMonth as text)   � ��� �   o r   t h e   s h o r t e r   v e r s i o n :       s e t   t e x t   o f   M o n t h T e x t I t e m   t o   ( m y M o n t h   a s   t e x t )� ��� r  O^��� l OV���� c  OV��� o  OR�� 0 mymonth myMonth� m  RU�
� 
TEXT�  �  � l     ���� n      ��� 1  []�
� 
pCNT� n  V[��� m  W[�
� 
ctxt� o  VW�� 0 monthtextitem MonthTextItem�  �  � ��� r  _l��� o  _b�� 0 mydays myDays� l     ���� n      ��� 1  ik�
� 
pCNT� n  bi��� m  ei�
� 
ctxt� o  be�� 0 daytextitem DayTextItem�  �  � ��� l mm����  �  �  � ��� l mm�
���
  � - ' Finally color the week-end days as red   � ��� N   F i n a l l y   c o l o r   t h e   w e e k - e n d   d a y s   a s   r e d� ��� r  m|��� I mx�	��
�	 .corecnte****       ****� n  mt��� 2 pt�
� 
clin� o  mp�� 0 daytextitem DayTextItem�  � o      �� 0 mylinecount myLineCount� ��� r  }���� K  }��� ���
� 
pcls� m  ���
� 
tRGi� ���
� 
RED � m  ���� �� � ��
�  
GREN� m  ������  � �����
�� 
BLUE� m  ������  ��  � o      ���� 0 mycolor myColor� ��� Y  ��������� k  ��� ��� r  ����� I �������
�� .corecnte****       ****� n  ����� 2 ����
�� 
cwor� n  ����� 4  �����
�� 
clin� o  ������ 0 i  � o  ������ 0 daytextitem DayTextItem��  � o      ���� 0 mywordcount myWordCount� ���� Z  ������� l �������� =  ����� o  ������ 0 mywordcount myWordCount� m  ������ ��  ��  � r  ����� o  ������ 0 mycolor myColor� n      ��� 1  ����
�� 
aiFC� n  ����� 7 ������
�� 
cwor� m  ������ � m  ������ � n  ����� 4  �����
�� 
clin� o  ������ 0 i  � o  ������ 0 daytextitem DayTextItem� ��� l �������� =  ����� o  ������ 0 mywordcount myWordCount� m  ������ ��  ��  � ���� r  �	��� o  ������ 0 mycolor myColor� n      ��� 1  ��
�� 
aiFC� n  ���� 4  ����
�� 
cwor� m   ���� � n  ����� 4  �����
�� 
clin� o  ������ 0 i  � o  ������ 0 daytextitem DayTextItem��  ��  ��  �� 0 i  � m  ������ � o  ������ 0 mylinecount myLineCount��  � ��� l ��������  ��  ��  � ��� l ������  � < 6 Sometimes Illustrator doesn't update its UI properly,   � ��� l   S o m e t i m e s   I l l u s t r a t o r   d o e s n ' t   u p d a t e   i t s   U I   p r o p e r l y ,� ��� l ��� ��  � !  so we redraw it when done.     � 6   s o   w e   r e d r a w   i t   w h e n   d o n e .� �� I ������
�� .ART5REFRnull��� ��� null��  ��  ��   % m                                                                                      ART5  alis    �  Macintosh HD               ��+H+   }�Adobe Illustrator.app                                           ���:6�        ����  	                Adobe Illustrator CS6     ��      �:(�     }�   q  EMacintosh HD:Applications:Adobe Illustrator CS6:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS6/Adobe Illustrator.app  / ��  ��  ��   " �� l     ��������  ��  ��  ��       ����   ��
�� .aevtoappnull  �   � **** ������	��
�� .aevtoappnull  �   � **** k    

  
  !����  ��  ��   ���� 0 i  	 N ���� ������������ D���� U�� b�������� |������������������ � ��� �����������������������������Q��vxz|~����������������������������������������
�� .miscactvnull��� ��� obj 
�� 
prmp
�� .sysostdfalis    ��� null�� 0 
myfilepath 
myFilePath
�� .aevtodocnull  �    alis
�� 
docu
�� 
cTXa  
�� 
pCNT
�� 
obj �� 0 monthtextitem MonthTextItem�� 0 daytextitem DayTextItem�� 0 mymonth myMonth
�� .misccurdldt    ��� null�� 	0 today  
�� 
mnth�� 0 	monthdays 	monthDays�� �� �� 0 d  
�� 
tab �� �� 
�� 
ret �� 0 month28days Month28Days�� 0 month30days Month30Days�� 0 month31days Month31Days
�� 
jan �� 0 mydays myDays
�� 
feb 
�� 
mar 
�� 
apr 
�� 
may 
�� 
jun 
�� 
jul 
�� 
aug 
�� 
sep 
�� 
oct 
�� 
nov 
�� 
dec 
�� .sysodlogaskr        TEXT
�� 
TEXT
�� 
ctxt
�� 
clin
�� .corecnte****       ****�� 0 mylinecount myLineCount
�� 
pcls
�� 
tRGi
�� 
RED �� �
�� 
GREN
�� 
BLUE�� �� 0 mycolor myColor
�� 
cwor�� 0 mywordcount myWordCount�� �� 
�� 
aiFC
�� .ART5REFRnull��� ��� null��� *j O*��l E�UO�*j O�j O*�k/�k/�[�,\Z�81�&E�O*�k/�k/�[�,\Z�81�&E` Oa E` O*j E` O_ a ,E` Oa E` O oka kh  �ka  kE` O_ _ %_ %_ k%_ %_ l%_ %_ m%_ %_ a %_ %_ a %_ %_ a %_ %E` [OY��O_ E` O_ a  %_ %a !%E` "O_ "_ %a #%E` $O_ a %  _ $E` &Y �_ a '  _ E` &Y �_ a (  _ $E` &Y �_ a )  _ "E` &Y �_ a *  _ $E` &Y �_ a +  _ "E` &Y �_ a ,  _ $E` &Y p_ a -  _ $E` &Y \_ a .  _ "E` &Y H_ a /  _ $E` &Y 4_ a 0  _ "E` &Y  _ a 1  _ $E` &Y a 2j 3OhOa 4_ %a 5%_ %a 6%_ %a 7%_ %a 8%_ %a 9%_ %a :%_ %_ &%E` &O_ a ;&�a <-�,FO_ &_ a <-�,FO_ a =-j >E` ?Oa @a Aa Ba Ca Dja Eja FE` GO wl_ ?kh  _ a =�/a H-j >E` IO_ Ia J  %_ G_ a =�/[a H\[Za K\Za J2a L,FY '_ Ia K  _ G_ a =�/a Ha K/a L,FY h[OY��O*j MUascr  ��ޭ