FasdUAS 1.101.10   ��   ��    k             l     ��������  ��  ��        l      �� 	 
��   	*********************************************************

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

********************************************************    
 �   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
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
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *      l     ��������  ��  ��        l     ��  ��    j d This script finds all occurrences of a string and then modifies each occurance in a uniform manner.     �   �   T h i s   s c r i p t   f i n d s   a l l   o c c u r r e n c e s   o f   a   s t r i n g   a n d   t h e n   m o d i f i e s   e a c h   o c c u r a n c e   i n   a   u n i f o r m   m a n n e r .      l     ��������  ��  ��        l     ��������  ��  ��        i         I      �� ���� 0 
countwords 
CountWords   ��  o      ���� 0 
text_frame  ��  ��    k            O        !   r     " # " I   �� $��
�� .corecnte****       **** $ n     % & % 2   ��
�� 
cwor & n     ' ( ' 4    �� )
�� 
cTXa ) o   	 
���� 0 
text_frame   ( 4    �� *
�� 
docu * m    ���� ��   # o      ���� 0 number_of_words   ! m      + +                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��     ,�� , L     - - o    ���� 0 number_of_words  ��     . / . l     ��������  ��  ��   /  0 1 0 i     2 3 2 I      �� 4���� 0 performaction PerformAction 4  5�� 5 o      ���� 0 
text_frame  ��  ��   3 k      6 6  7 8 7 O      9 : 9 r     ; < ; m    ����  < l      =���� = n       > ? > 1    ��
�� 
ptsz ? l    @���� @ n     A B A 1    ��
�� 
sele B n     C D C 4   	 �� E
�� 
cTXa E o   
 ���� 0 
text_frame   D 4    	�� F
�� 
docu F m    ���� ��  ��  ��  ��   : m      G G                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��   8  H�� H L     I I m    ��
�� boovtrue��   1  J K J l     ��������  ��  ��   K  L M L l     �� N O��   N ; 5 get strings to be found and inserted from user input    O � P P j   g e t   s t r i n g s   t o   b e   f o u n d   a n d   i n s e r t e d   f r o m   u s e r   i n p u t M  Q R Q l    	 S���� S r     	 T U T I    �� V W
�� .sysodlogaskr        TEXT V m      X X � Y Y : E n t e r   t h e   s t r i n g   t o   b e   F O U N D : W �� Z��
�� 
dtxt Z m     [ [ � \ \  ��   U o      ���� 0 temp  ��  ��   R  ] ^ ] l  
  _���� _ r   
  ` a ` c   
  b c b n   
  d e d 1    ��
�� 
ttxt e o   
 ���� 0 temp   c m    ��
�� 
TEXT a o      ���� 0 findtext FindText��  ��   ^  f g f l     ��������  ��  ��   g  h i h l     �� j k��   j P Jmake sure there is at least 1 word to find before executing rest of script    k � l l � m a k e   s u r e   t h e r e   i s   a t   l e a s t   1   w o r d   t o   f i n d   b e f o r e   e x e c u t i n g   r e s t   o f   s c r i p t i  m n m l   6 o���� o W    6 p q p k    1 r r  s t s I   �� u��
�� .sysodisAaleR        TEXT u m     v v � w w 4 P l e a s e   e n t e r   a   t e x t   s t r i n g��   t  x y x l     �� z {��   z ; 5 get strings to be found and inserted from user input    { � | | j   g e t   s t r i n g s   t o   b e   f o u n d   a n d   i n s e r t e d   f r o m   u s e r   i n p u t y  } ~ } r     )  �  I    '�� � �
�� .sysodlogaskr        TEXT � m     ! � � � � � : E n t e r   t h e   s t r i n g   t o   b e   F O U N D : � �� ���
�� 
dtxt � m   " # � � � � �  ��   � o      ���� 0 temp   ~  ��� � r   * 1 � � � c   * / � � � n   * - � � � 1   + -��
�� 
ttxt � o   * +���� 0 temp   � m   - .��
�� 
TEXT � o      ���� 0 findtext FindText��   q >     � � � o    ���� 0 findtext FindText � m     � � � � �  ��  ��   n  � � � l     ��������  ��  ��   �  � � � l  7 @ � � � � r   7 @ � � � I  7 >�� ���
�� .corecnte****       **** � n   7 : � � � 2  8 :��
�� 
cwor � o   7 8���� 0 findtext FindText��   � o      ���� 0 num_of_words_to_find   � / )number of words in the string to be found    � � � � R n u m b e r   o f   w o r d s   i n   t h e   s t r i n g   t o   b e   f o u n d �  � � � l  A F � � � � r   A F � � � m   A B��
�� boovfals � o      ���� 0 foundit FoundIt � 0 *initialize variable, assume no match found    � � � � T i n i t i a l i z e   v a r i a b l e ,   a s s u m e   n o   m a t c h   f o u n d �  � � � l     ��������  ��  ��   �  � � � l  G- ����� � O   G- � � � k   M, � �  � � � I  M R������
�� .miscactvnull��� ��� null��  ��   �  ��� � Z   S, � ��� � � =  S ^ � � � l  S \ ����� � I  S \�� ���
�� .corecnte****       **** � 2  S X��
�� 
docu��  ��  ��   � m   \ ]����   � I  a h�� ���
�� .sysodlogaskr        TEXT � m   a d � � � � � � T h i s   s c r i p t   r e q u i r e s   a   d o c u m e n t   w i t h   a t   l e a s t   o n e   t e x t   b o x   t o   s e a r c h   t h r o u g h .��  ��   � k   k, � �  � � � r   k p � � � m   k l����   � o      ���� 0 strings_changed   �  � � � l  q q��������  ��  ��   �  � � � l  q q�� � ���   � ` Zmake sure there is a text art in the document. if so, then repeat for each text art object    � � � � � m a k e   s u r e   t h e r e   i s   a   t e x t   a r t   i n   t h e   d o c u m e n t .   i f   s o ,   t h e n   r e p e a t   f o r   e a c h   t e x t   a r t   o b j e c t �  � � � r   q � � � � I  q �� ���
�� .corecnte****       **** � n   q { � � � 2  w {��
�� 
cTXa � 4   q w�� �
�� 
docu � m   u v���� ��   � o      ���� 0 num_of_text_frames   �  ��� � Z   �, � ��� � � ?   � � � � � o   � ����� 0 num_of_text_frames   � m   � �����   � k   �" � �  � � � l  �� � � � � Y   �� �� � ��~ � k   �� � �  � � � l  � ��}�|�{�}  �|  �{   �  � � � r   � � � � � m   � ��z�z  � o      �y�y 0 current_word   �  � � � r   � � � � � n  � � � � � I   � ��x ��w�x 0 
countwords 
CountWords �  ��v � o   � ��u�u 0 current_text_frame  �v  �w   �  f   � � � o      �t�t 0 num_of_words_in_text_frame   �  � � � l  � ��s�r�q�s  �r  �q   �  � � � l  � ��p � ��p   � � {repeat as long as there are still words in the text art to evaluate and the 1st word to be found occurs in current text art    � � � � � r e p e a t   a s   l o n g   a s   t h e r e   a r e   s t i l l   w o r d s   i n   t h e   t e x t   a r t   t o   e v a l u a t e   a n d   t h e   1 s t   w o r d   t o   b e   f o u n d   o c c u r s   i n   c u r r e n t   t e x t   a r t �  � � � l  �� � � � � V   �� � � � k   �� � �  � � � l  � ��o �o    A ; if first word matches, compare remaining words to be found    � v   i f   f i r s t   w o r d   m a t c h e s ,   c o m p a r e   r e m a i n i n g   w o r d s   t o   b e   f o u n d �  Z   ���n�m =   � � n   � �	
	 1   � ��l
�l 
pCNT
 n   � � 4   � ��k
�k 
cwor o   � ��j�j 0 current_word   n   � � 4   � ��i
�i 
cTXa o   � ��h�h 0 current_text_frame   4   � ��g
�g 
docu m   � ��f�f  o   � ��e�e 0 findtext FindText k   ��  r   � � m   � ��d
�d boovtrue o      �c�c 0 foundit FoundIt  r   � � m   � ��b�b  o      �a�a 0 loopvar LoopVar  V   �M k  H  !  Z  >"#�`�_" >  2$%$ l %&�^�]& n  %'(' 1  !%�\
�\ 
pCNT( n  !)*) 4  !�[+
�[ 
cwor+ l  ,�Z�Y, [   -.- o  �X�X 0 current_word  . o  �W�W 0 loopvar LoopVar�Z  �Y  * 4  �V/
�V 
cTXa/ o  �U�U 0 current_text_frame  �^  �]  % l %10�T�S0 n  %1121 1  -1�R
�R 
pCNT2 n  %-343 4  &-�Q5
�Q 
cwor5 l ',6�P�O6 [  ',787 m  '(�N�N 8 o  (+�M�M 0 loopvar LoopVar�P  �O  4 o  %&�L�L 0 findtext FindText�T  �S  # l 5:9:;9 r  5:<=< m  56�K
�K boovfals= o      �J�J 0 foundit FoundIt: F @if at any time one of the words doesn't match, there is no match   ; �>> � i f   a t   a n y   t i m e   o n e   o f   t h e   w o r d s   d o e s n ' t   m a t c h ,   t h e r e   i s   n o   m a t c h�`  �_  ! ?�I? r  ?H@A@ [  ?DBCB o  ?B�H�H 0 loopvar LoopVarC m  BC�G�G A o      �F�F 0 loopvar LoopVar�I   l D�E�DD F  EFE l G�C�BG A  HIH o  �A�A 0 loopvar LoopVarI l J�@�?J o  �>�> 0 num_of_words_to_find  �@  �?  �C  �B  F o  
�=�= 0 foundit FoundIt�E  �D   KLK l NN�<�;�:�<  �;  �:  L MNM l NN�9OP�9  O [ Uif string was found, find 1st and last character of string, delete and replace string   P �QQ � i f   s t r i n g   w a s   f o u n d ,   f i n d   1 s t   a n d   l a s t   c h a r a c t e r   o f   s t r i n g ,   d e l e t e   a n d   r e p l a c e   s t r i n gN R�8R Z  N�ST�7�6S o  NQ�5�5 0 foundit FoundItT k  T�UU VWV r  TqXYX n  TmZ[Z 1  im�4
�4 
pSTR[ n  Ti\]\ 4di�3^
�3 
cha ^ m  gh�2�2 ] n  Td_`_ 4  _d�1a
�1 
cwora o  `c�0�0 0 current_word  ` n  T_bcb 4  Z_�/d
�/ 
cTXad o  ]^�.�. 0 current_text_frame  c 4  TZ�-e
�- 
docue m  XY�,�, Y o      �+�+ 0 	firstchar 	FirstCharW fgf r  r�hih n  r�jkj 1  ���*
�* 
pSTRk n  r�lml 4 ���)n
�) 
cha n m  ���(�(��m n  r�opo 4  }��'q
�' 
cworq l ~�r�&�%r \  ~�sts [  ~�uvu o  ~��$�$ 0 current_word  v o  ���#�# 0 num_of_words_to_find  t m  ���"�" �&  �%  p n  r}wxw 4  x}�!y
�! 
cTXay o  {|� �  0 current_text_frame  x 4  rx�z
� 
docuz m  vw�� i o      �� 0 lastchar LastCharg {|{ r  ��}~} n  ��� 7 �����
� 
cha � o  ���� 0 	firstchar 	FirstChar� o  ���� 0 lastchar LastChar� n  ����� 4  ����
� 
cTXa� o  ���� 0 current_text_frame  � 4  ����
� 
docu� m  ���� ~ 1  ���
� 
sele| ��� r  ����� n ����� I  ������ 0 performaction PerformAction� ��� o  ���� 0 current_text_frame  �  �  �  f  ��� o      �� "0 actionperformed actionPerformed� ��� l ������ r  ����� [  ����� o  ���� 0 strings_changed  � m  ���� � o      �� 0 strings_changed  � / )increment total number of strings changed   � ��� R i n c r e m e n t   t o t a l   n u m b e r   o f   s t r i n g s   c h a n g e d�  �7  �6  �8  �n  �m   ��� l ����
�	�  �
  �	  � ��� l ������ r  ����� m  ���
� boovfals� o      �� 0 foundit FoundIt� 9 3initialize variable for next iteration through loop   � ��� f i n i t i a l i z e   v a r i a b l e   f o r   n e x t   i t e r a t i o n   t h r o u g h   l o o p� ��� r  ����� [  ����� o  ���� 0 current_word  � m  ���� � o      �� 0 current_word  �   � l  � ����� F   � ���� l  � ��� ��� B   � ���� o   � ����� 0 current_word  � l  � ������� [   � ���� \   � ���� o   � ����� 0 num_of_words_in_text_frame  � o   � ����� 0 num_of_words_to_find  � m   � ����� ��  ��  �   ��  � E   � ���� l 	 � ������� l  � ������� n   � ���� 1   � ���
�� 
pCNT� l  � ������� n   � ���� m   � ���
�� 
ctxt� l  � ������� n   � ���� m   � ���
�� 
cSTO� n   � ���� 4   � ����
�� 
cTXa� o   � ����� 0 current_text_frame  � 4   � ����
�� 
docu� m   � ����� ��  ��  ��  ��  ��  ��  ��  ��  � o   � ����� 0 findtext FindText�  �   �   within text art    � ���     w i t h i n   t e x t   a r t � ���� l ����������  ��  ��  ��  � 0 current_text_frame   � m   � �����  � o   � ����� 0 num_of_text_frames  �~   �  for each text art    � ��� " f o r   e a c h   t e x t   a r t � ���� Z  �"������ = ����� o  ������ 0 strings_changed  � m  ������  � I �������
�� .sysodlogaskr        TEXT� m  ���� ��� " S t r i n g   n o t   f o u n d .��  ��  � I "����
�� .sysodlogaskr        TEXT� b  ��� b  ��� m  �� ���  S t r i n g   c h a n g e d  � o  ���� 0 strings_changed  � m  �� ���    t i m e s .� ����
�� 
btns� l 
������ J  �� ���� m  �� ���  O K��  ��  ��  � �����
�� 
dflt� J  �� ���� m  �� ���  O K��  ��  ��  ��   � I %,�����
�� .sysodlogaskr        TEXT� m  %(�� ��� � T h i s   s c r i p t   r e q u i r e s   a   d o c u m e n t   w i t h   a t   l e a s t   o n e   t e x t   b o x   t o   s e a r c h   t h r o u g h .��  ��  ��   � m   G J��                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  ��  ��   � ��� l     ��������  ��  ��  � ��� l     ��������  ��  ��  � ���� l     ��������  ��  ��  ��       ��������  � �������� 0 
countwords 
CountWords�� 0 performaction PerformAction
�� .aevtoappnull  �   � ****� �� ���������� 0 
countwords 
CountWords�� ����� �  ���� 0 
text_frame  ��  � ������ 0 
text_frame  �� 0 number_of_words  �  +��������
�� 
docu
�� 
cTXa
�� 
cwor
�� .corecnte****       ****�� � *�k/�/�-j E�UO�� �� 3���������� 0 performaction PerformAction�� ����� �  ���� 0 
text_frame  ��  � ���� 0 
text_frame  �  G������������ 
�� 
docu
�� 
cTXa
�� 
sele
�� 
ptsz�� � �*�k/�/�,�,FUOe� �����������
�� .aevtoappnull  �   � ****� k    -��  Q��  ]��  m��  ���  ���  �����  ��  ��  � ���� 0 current_text_frame  � 0 X�� [���������� � v�� � �������������� �������������������������������������������������
�� 
dtxt
�� .sysodlogaskr        TEXT�� 0 temp  
�� 
ttxt
�� 
TEXT�� 0 findtext FindText
�� .sysodisAaleR        TEXT
�� 
cwor
�� .corecnte****       ****�� 0 num_of_words_to_find  �� 0 foundit FoundIt
�� .miscactvnull��� ��� null
�� 
docu�� 0 strings_changed  
�� 
cTXa�� 0 num_of_text_frames  �� 0 current_word  �� 0 
countwords 
CountWords�� 0 num_of_words_in_text_frame  
�� 
cSTO
�� 
ctxt
�� 
pCNT
�� 
bool�� 0 loopvar LoopVar
�� 
cha 
�� 
pSTR�� 0 	firstchar 	FirstChar�� 0 lastchar LastChar
�� 
sele�� 0 performaction PerformAction�� "0 actionperformed actionPerformed
�� 
btns
�� 
dflt�� ��.���l E�O��,�&E�O #h���j 
O���l E�O��,�&E�[OY��O��-j E�OfE` Oa �*j O*a -j j  a j Y�jE` O*a k/a -j E` O_ j�ak_ kh  kE` O)�k+ E` O=h_ _ �k	 *a k/a �/a ,a -a ,�a &*a k/a �/�_ /a ,�  �eE` OkE` O Nh_ �	 	_ a &*a �/�_ _ /a ,��k_ /a , 
fE` Y hO_ kE` [OY��O_  {*a k/a �/�_ /a  k/a !,E` "O*a k/a �/�_ �k/a  i/a !,E` #O*a k/a �/[a  \[Z_ "\Z_ #2*a $,FO)�k+ %E` &O_ kE` Y hY hOfE` O_ kE` [OY��OP[OY��O_ j  a 'j Y #a (_ %a )%a *a +kva ,a -kva . Y 	a /j Uascr  ��ޭ