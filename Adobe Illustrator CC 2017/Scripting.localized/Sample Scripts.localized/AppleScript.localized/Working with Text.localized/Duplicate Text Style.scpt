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
 l     ��������  ��  ��        l      ��  ��    � �
DESCRIPTION: This script creates 2 empty documents, then displays a maximum of 10 fonts in the first document, the displayed fonts are then duplicated over to the second document.
     �  j 
 D E S C R I P T I O N :   T h i s   s c r i p t   c r e a t e s   2   e m p t y   d o c u m e n t s ,   t h e n   d i s p l a y s   a   m a x i m u m   o f   1 0   f o n t s   i n   t h e   f i r s t   d o c u m e n t ,   t h e   d i s p l a y e d   f o n t s   a r e   t h e n   d u p l i c a t e d   o v e r   t o   t h e   s e c o n d   d o c u m e n t . 
      l     ��������  ��  ��     ��  l    � ����  O     �    k    �       l   ��������  ��  ��        I   	������
�� .miscactvnull��� ��� null��  ��        I  
 ���� 
�� .corecrel****      � null��    �� ��
�� 
kocl  m    ��
�� 
docu��       !   l   ��������  ��  ��   !  " # " r     $ % $ n     & ' & 4    �� (
�� 
caLY ( m    ����  ' 4    �� )
�� 
docu ) m    ����  % o      ���� 0 	sourcedoc 	sourceDoc #  * + * l   ��������  ��  ��   +  , - , r     . / . m    ���� 
 / o      ���� 0 xpos   -  0 1 0 r     * 2 3 2 \     ( 4 5 4 l    & 6���� 6 n     & 7 8 7 1   $ &��
�� 
pSHh 8 4     $�� 9
�� 
docu 9 m   " #���� ��  ��   5 m   & '���� 
 3 o      ���� 0 ypos   1  : ; : l  + +�� < =��   < . ( get the number of fonts in the document    = � > > P   g e t   t h e   n u m b e r   o f   f o n t s   i n   t h e   d o c u m e n t ;  ? @ ? r   + 4 A B A I  + 2�� C��
�� .corecnte****       **** C 2  + .��
�� 
cTXf��   B o      ���� 0 	fontcount 	fontCount @  D E D l  5 5��������  ��  ��   E  F G F Z   5 � H I�� J H ?   5 8 K L K o   5 6���� 0 	fontcount 	fontCount L m   6 7����   I k   ; � M M  N O N Z   ; H P Q���� P ?   ; > R S R o   ; <���� 0 	fontcount 	fontCount S m   < =���� 
 Q r   A D T U T m   A B���� 
 U o      ���� 0 	fontcount 	fontCount��  ��   O  V W V I  I P���� X
�� .corecrel****      � null��   X �� Y��
�� 
kocl Y m   K L��
�� 
docu��   W  Z [ Z r   Q Z \ ] \ n   Q X ^ _ ^ 4   U X�� `
�� 
caLY ` m   V W����  _ 4   Q U�� a
�� 
docu a m   S T����  ] o      ���� 0 	targetdoc 	targetDoc [  b c b l  [ [�� d e��   d F @ display all the fonts, if there is more than 10 display 10 only    e � f f �   d i s p l a y   a l l   t h e   f o n t s ,   i f   t h e r e   i s   m o r e   t h a n   1 0   d i s p l a y   1 0   o n l y c  g h g I  [ f�� i��
�� .sysodlogaskr        TEXT i b   [ b j k j b   [ ^ l m l m   [ \ n n � o o ( S c r i p t   w i l l   d i s p l a y   m o   \ ]���� 0 	fontcount 	fontCount k m   ^ a p p � q q �   f o n t   s t y l e ( s ) ,   t h e n   d u p l i c a t e   t h e   s t y l e ( s )   t o   a n o t h e r   d o c u m e n t .��   h  r s r Y   g � t�� u v�� t k   q � w w  x y x r   q } z { z n   q y | } | 1   u y��
�� 
pnam } 4   q u�� ~
�� 
cTXf ~ o   s t���� 0 i   { o      ���� 0 fontname fontName y   �  l  ~ ~�� � ���   � $ 	Create the text frame objects    � � � � < 	 C r e a t e   t h e   t e x t   f r a m e   o b j e c t s �  � � � I  ~ ����� �
�� .corecrel****      � null��   � �� � �
�� 
kocl � n  � � � � � m   � ���
�� 
cTXa � o   � ����� 0 	sourcedoc 	sourceDoc � �� ���
�� 
prdt � K   � � � � �� � �
�� 
pCNT � o   � ����� 0 fontname fontName � �� ���
�� 
paPs � J   � � � �  � � � o   � ����� 0 xpos   �  ��� � o   � ����� 0 ypos  ��  ��  ��   �  � � � r   � � � � � 4   � ��� �
�� 
cTXf � o   � ����� 0 i   � l      ����� � n       � � � m   � ���
�� 
cTXf � n   � � � � � m   � ���
�� 
ctxt � l  � � ����� � 1   � ���
�� 
rslt��  ��  ��  ��   �  � � � l  � ���������  ��  ��   �  ��� � r   � � � � � \   � � � � � o   � ����� 0 ypos   � m   � �����  � o      ���� 0 ypos  ��  �� 0 i   u m   j k����  v o   k l���� 0 	fontcount 	fontCount��   s  � � � I  � ��� � �
�� .coreclon****      � **** � n   � � � � � 2   � ���
�� 
caAT � o   � ����� 0 	sourcedoc 	sourceDoc � �� ���
�� 
insh � o   � ����� 0 	targetdoc 	targetDoc��   �  ��� � r   � � � � � 4   � ��� �
�� 
docu � m   � �����  � 1   � ���
�� 
aiAD��  ��   J k   � � � �  � � � l  � ��� � ���   �  	 no fonts    � � � �    n o   f o n t s �  ��� � I  � ��� ���
�� .sysodlogaskr        TEXT � m   � � � � � � � H T h e r e   a r e   n o   f o n t   s t y l e s   t o   d i s p l a y !��  ��   G  ��� � l  � ���~�}�  �~  �}  ��    m      � �                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  ��  ��  ��       �| � ��|   � �{
�{ .aevtoappnull  �   � **** � �z ��y�x � ��w
�z .aevtoappnull  �   � **** � k     � � �  �v�v  �y  �x   � �u�u 0 i   � ! ��t�s�r�q�p�o�n�m�l�k�j�i�h�g n p�f�e�d�c�b�a�`�_�^�]�\�[�Z�Y�X �
�t .miscactvnull��� ��� null
�s 
kocl
�r 
docu
�q .corecrel****      � null
�p 
caLY�o 0 	sourcedoc 	sourceDoc�n 
�m 0 xpos  
�l 
pSHh�k 0 ypos  
�j 
cTXf
�i .corecnte****       ****�h 0 	fontcount 	fontCount�g 0 	targetdoc 	targetDoc
�f .sysodlogaskr        TEXT
�e 
pnam�d 0 fontname fontName
�c 
cTXa
�b 
prdt
�a 
pCNT
�` 
paPs�_ 
�^ 
rslt
�] 
ctxt�\ 
�[ 
caAT
�Z 
insh
�Y .coreclon****      � ****
�X 
aiAD�w �� �*j O*��l O*�k/�k/E�O�E�O*�k/�,�E�O*�-j E�O�j ��� �E�Y hO*��l O*�l/�k/E�O��%a %j O Sk�kh  *�/a ,E` O*��a ,a a _ a ��lva a  O*�/_ a -�,FO�a E�[OY��O�a -a �l O*�l/*a ,FY 	a  j OPU ascr  ��ޭ